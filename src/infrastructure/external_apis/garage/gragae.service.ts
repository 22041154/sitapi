import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'node:path';
import { GarageClient } from './garage.client';
import {
  IStorageService,
  UploadResult,
} from '../../../domain/interfaces/storage.interface';

@Injectable()
export class GarageService implements IStorageService {
  constructor(private readonly garageClient: GarageClient) {}

  async upload(
    bucket: string,
    file: Express.Multer.File,
    folder: string = 'general',
  ): Promise<UploadResult> {
    const ext        = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    const objectKey  = `${folder}/${uniqueName}`;

    try {
      await this.garageClient.getClient().send(
        new PutObjectCommand({
          Bucket:      bucket,
          Key:         objectKey,
          Body:        file.buffer,
          ContentType: file.mimetype,
          Metadata: {
            originalName: encodeURIComponent(file.originalname),
          },
        }),
      );

      return {
        path:         objectKey,
        bucket,
        originalName: file.originalname,
        mimeType:     file.mimetype,
        sizeBytes:    file.size,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new InternalServerErrorException(
        `Error al subir archivo: ${message}`,
      );
    }
  }

  async getPresignedUrl(
    bucket: string,
    objectPath: string,
    expiresInSeconds: number = 3600,
  ): Promise<string> {
    await this.assertExists(bucket, objectPath);

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key:    objectPath,
    });

    return getSignedUrl(this.garageClient.getClient(), command, {
      expiresIn: expiresInSeconds,
    });
  }

  async getFileStream(
    bucket: string,
    objectPath: string,
  ): Promise<NodeJS.ReadableStream> {
    await this.assertExists(bucket, objectPath);

    const response = await this.garageClient.getClient().send(
      new GetObjectCommand({ Bucket: bucket, Key: objectPath }),
    );

    return response.Body as NodeJS.ReadableStream;
  }

  async delete(bucket: string, objectPath: string): Promise<void> {
    try {
      await this.garageClient.getClient().send(
        new DeleteObjectCommand({ Bucket: bucket, Key: objectPath }),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new InternalServerErrorException(
        `Error al eliminar archivo: ${message}`,
      );
    }
  }

  async replace(
    bucket: string,
    oldPath: string,
    newFile: Express.Multer.File,
    folder?: string,
  ): Promise<UploadResult> {
    const result = await this.upload(bucket, newFile, folder);
    await this.delete(bucket, oldPath);
    return result;
  }

  private async assertExists(
    bucket: string,
    objectPath: string,
  ): Promise<void> {
    try {
      await this.garageClient.getClient().send(
        new HeadObjectCommand({ Bucket: bucket, Key: objectPath }),
      );
    } catch {
      throw new NotFoundException(
        `Archivo no encontrado: ${objectPath}`,
      );
    }
  }
}