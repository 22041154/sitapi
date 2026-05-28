import { Injectable, Inject } from '@nestjs/common';
import { ISsDocumentosAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { CrearSsDocumentosAlumnosDto } from '../../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';
import { SsDocumentosAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';

@Injectable()
export class CrearSsDocumentosAlumnosUseCase {
  constructor(
    @Inject('ISsDocumentosAlumnosRepository')
    private readonly documentosRepository: ISsDocumentosAlumnosRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  async Ejecutar(
    dto: CrearSsDocumentosAlumnosDto,
    archivos: { [campo: string]: Express.Multer.File[] },
  ): Promise<SsDocumentosAlumnosPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;
    const folder = `documentos-alumnos/${dto.id_alumno_academico}`;

    // 1. Sube cada archivo a Garage y obtiene su path
    const carta_presentacion = archivos?.carta_presentacion
      ? (await this.storageService.upload(bucket, archivos.carta_presentacion[0], folder)).path
      : null;

    const carta_compromiso = archivos?.carta_compromiso
      ? (await this.storageService.upload(bucket, archivos.carta_compromiso[0], folder)).path
      : null;

    const carta_aceptacion = archivos?.carta_aceptacion
      ? (await this.storageService.upload(bucket, archivos.carta_aceptacion[0], folder)).path
      : null;

    const seguro_facultativo = archivos?.seguro_facultativo
      ? (await this.storageService.upload(bucket, archivos.seguro_facultativo[0], folder)).path
      : null;

    // 2. Guarda los paths en PostgreSQL
    const poco = await this.documentosRepository.Crear(dto, {
      carta_presentacion,
      carta_compromiso,
      carta_aceptacion,
      seguro_facultativo,
    });

    // 3. Convierte los paths a presigned URLs antes de retornar
    return new SsDocumentosAlumnosPoco(
      poco.id,
      poco.id_alumno_academico,
      poco.id_plan_trabajo,
      poco.carta_presentacion
        ? await this.storageService.getPresignedUrl(bucket, poco.carta_presentacion)
        : null,
      poco.carta_compromiso
        ? await this.storageService.getPresignedUrl(bucket, poco.carta_compromiso)
        : null,
      poco.carta_aceptacion
        ? await this.storageService.getPresignedUrl(bucket, poco.carta_aceptacion)
        : null,
      poco.seguro_facultativo
        ? await this.storageService.getPresignedUrl(bucket, poco.seguro_facultativo)
        : null,
    );
  }
}