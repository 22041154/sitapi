import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISsDocumentosAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { ActualizarSsDocumentosAlumnosDto } from '../../../../dtos/requests/Servicio Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.dto';
import { SsDocumentosAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';
import { PeriodosEscolaresRepository } from '../../../../infrastructure/bd/repositories/catalogos/periodos_escolares.entity';
import { AlumnoDatosAcademicosRepository } from '../../../../infrastructure/bd/repositories/alumnos_datos_academicos.repositiry';

@Injectable()
export class ActualizarSsDocumentosAlumnosUseCase {
  constructor(
    @Inject('ISsDocumentosAlumnosRepository')
    private readonly documentosRepository: ISsDocumentosAlumnosRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,

    private readonly periodosRepository: PeriodosEscolaresRepository,
    private readonly alumnoRepository: AlumnoDatosAcademicosRepository,
  ) {}

  async Ejecutar(
    id: number,
    dto: ActualizarSsDocumentosAlumnosDto,
    archivos: { [campo: string]: Express.Multer.File[] },
    idAlumnoAcademico: number,  // ← viene del token JWT
  ): Promise<SsDocumentosAlumnosPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;

    // 1. Obtener periodo activo y no_control del alumno
    const periodoActivo = await this.periodosRepository.ObtenerPeriodoActivo();
    const noControl = await this.alumnoRepository.ObtenerNoControlPorId(idAlumnoAcademico);

    if (!noControl) {
      throw new NotFoundException(
        `No se encontró el alumno con id ${idAlumnoAcademico}`,
      );
    }

    // 2. Construir la carpeta: ServicioSocial/ENE-JUN/2026/21041305
    const folder = `ServicioSocial/${periodoActivo}/${noControl}`;

    // 3. Verificar que el registro exista y obtener paths actuales
    const pathsActuales = await this.documentosRepository.ObtenerPathsPorId(id);

    if (!pathsActuales) {
      throw new NotFoundException(`No se encontró el registro de documentos con id ${id}`);
    }

    const nuevosPaths: { [key: string]: string | null } = {};
    const campos = [
      'carta_presentacion',
      'carta_compromiso',
      'carta_aceptacion',
      'seguro_facultativo',
    ] as const;

    // 4. Por cada campo: si llega archivo nuevo, reemplaza en Garage con nombre fijo
    for (const campo of campos) {
      if (archivos?.[campo]) {
        const pathViejo = pathsActuales[campo];
        if (pathViejo) {
          // Reemplaza el archivo existente conservando el nombre fijo
          const resultado = await this.storageService.replace(
            bucket,
            pathViejo,
            archivos[campo][0],
            folder,
            campo,  // ← nombre fijo
          );
          nuevosPaths[campo] = resultado.path;
        } else {
          // No había archivo antes, sube con nombre fijo
          const resultado = await this.storageService.upload(
            bucket,
            archivos[campo][0],
            folder,
            campo,  // ← nombre fijo
          );
          nuevosPaths[campo] = resultado.path;
        }
      }
    }

    // 5. Guardar los nuevos paths en PostgreSQL
    const poco = await this.documentosRepository.Actualizar(id, dto, nuevosPaths);

    // 6. Convertir paths a presigned URLs antes de retornar
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