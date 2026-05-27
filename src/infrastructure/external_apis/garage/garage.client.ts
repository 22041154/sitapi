import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class GarageClient {
  private readonly client: S3Client;

  constructor(private readonly config: ConfigService) {
    this.client = new S3Client({
      endpoint:        config.get<string>('GARAGE_ENDPOINT'),
      region:          config.get<string>('GARAGE_REGION', 'garage'),
      credentials: {
        accessKeyId:     config.get<string>('GARAGE_ACCESS_KEY_ID'),
        secretAccessKey: config.get<string>('GARAGE_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  getClient(): S3Client {
    return this.client;
  }
}