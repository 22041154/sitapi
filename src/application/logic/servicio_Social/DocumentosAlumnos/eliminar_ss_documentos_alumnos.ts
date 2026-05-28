import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISsDocumentosAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';

@Injectable()
export class EliminarSsDocumentosAlumnosUseCase {
  constructor(
    @Inject('ISsDocumentosAlumnosRepository')
    private readonly documentosRepository: ISsDocumentosAlumnosRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  async Ejecutar(id: number): Promise<void> {
    const paths = await this.documentosRepository.ObtenerPathsPorId(id);

    if (!paths) {
      throw new NotFoundException(`No se encontró el registro de documentos con el id ${id}`);
    }

    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;

    // Elimina de Garage solo los archivos que existan
    await Promise.all([
      paths.carta_presentacion  ? this.storageService.delete(bucket, paths.carta_presentacion)  : null,
      paths.carta_compromiso    ? this.storageService.delete(bucket, paths.carta_compromiso)    : null,
      paths.carta_aceptacion    ? this.storageService.delete(bucket, paths.carta_aceptacion)    : null,
      paths.seguro_facultativo  ? this.storageService.delete(bucket, paths.seguro_facultativo)  : null,
    ].filter(Boolean));

    // Elimina el registro de PostgreSQL
    await this.documentosRepository.Eliminar(id);
  }
}