import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GarageClient } from '../external_apis/garage/garage.client';
import { GarageService } from '../external_apis/garage/gragae.service';
import { STORAGE_SERVICE } from '../../domain/interfaces/storage.interface';

@Module({
  imports: [ConfigModule],
  providers: [
    GarageClient,
    {
      provide:  STORAGE_SERVICE,
      useClass: GarageService,
    },
  ],
  exports: [STORAGE_SERVICE],
})
export class StorageModule {}