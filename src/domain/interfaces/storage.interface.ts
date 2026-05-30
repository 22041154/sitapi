export interface UploadResult {
  path: string;
  bucket: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface IStorageService {
  upload(
    bucket: string,
    file: Express.Multer.File,
    folder?: string,
    customFileName?: string,  // ← nuevo
  ): Promise<UploadResult>;

  getPresignedUrl(
    bucket: string,
    path: string,
    expiresInSeconds?: number,
  ): Promise<string>;

  getFileStream(
    bucket: string,
    path: string,
  ): Promise<NodeJS.ReadableStream>;

  delete(
    bucket: string,
    path: string,
  ): Promise<void>;

  replace(
    bucket: string,
    oldPath: string,
    newFile: Express.Multer.File,
    folder?: string,
    customFileName?: string,  // ← nuevo
  ): Promise<UploadResult>;
}

export const STORAGE_SERVICE = Symbol('IStorageService');