import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISsDocumentosAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { CrearSsDocumentosAlumnosDto } from '../../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';
import { SsDocumentosAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';
import { PeriodosEscolaresRepository } from '../../../../infrastructure/bd/repositories/catalogos/periodos_escolares.entity';
import { AlumnoDatosAcademicosRepository } from '../../../../infrastructure/bd/repositories/alumnos_datos_academicos.repositiry';

@Injectable()
export class CrearSsDocumentosAlumnosUseCase {
  constructor(
    @Inject('ISsDocumentosAlumnosRepository')
    private readonly documentosRepository: ISsDocumentosAlumnosRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,

    private readonly periodosRepository: PeriodosEscolaresRepository,
    private readonly alumnoRepository: AlumnoDatosAcademicosRepository,
  ) {}

  async Ejecutar(
    dto: CrearSsDocumentosAlumnosDto,
    archivos: { [campo: string]: Express.Multer.File[] },
  ): Promise<SsDocumentosAlumnosPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;

    // 1. Obtener periodo activo y no_control del alumno
    const periodoActivo = await this.periodosRepository.ObtenerPeriodoActivo();
    const noControl = await this.alumnoRepository.ObtenerNoControlPorId(
      Number(dto.id_alumno_academico),
    );

    if (!noControl) {
      throw new NotFoundException(
        `No se encontró el alumno con id ${dto.id_alumno_academico}`,
      );
    }

    // 2. Construir la carpeta: ServicioSocial/2025-1/12345678
    const folder = `ServicioSocial/${periodoActivo}/${noControl}`;

    // 3. Subir archivos a Garage
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

    // 4. Guardar paths en PostgreSQL
    const poco = await this.documentosRepository.Crear(dto, {
      carta_presentacion,
      carta_compromiso,
      carta_aceptacion,
      seguro_facultativo,
    });

    // 5. Convertir paths a presigned URLs
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