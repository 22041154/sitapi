import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISsDocumentosAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { ActualizarSsDocumentosAlumnosDto } from '../../../../dtos/requests/Servicio Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.dto';
import { SsDocumentosAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';

@Injectable()
export class ActualizarSsDocumentosAlumnosUseCase {
  constructor(
    @Inject('ISsDocumentosAlumnosRepository')
    private readonly documentosRepository: ISsDocumentosAlumnosRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  async Ejecutar(
    id: number,
    dto: ActualizarSsDocumentosAlumnosDto,
    archivos: { [campo: string]: Express.Multer.File[] },
  ): Promise<SsDocumentosAlumnosPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;
    const folder = `documentos-alumnos/${dto.id_alumno_academico}`;

    // 1. Verifica que el registro exista y obtiene los paths actuales
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

    // 2. Por cada campo: si llega archivo nuevo, reemplaza en Garage
    for (const campo of campos) {
      if (archivos?.[campo]) {
        const pathViejo = pathsActuales[campo];
        if (pathViejo) {
          const resultado = await this.storageService.replace(
            bucket,
            pathViejo,
            archivos[campo][0],
            folder,
          );
          nuevosPaths[campo] = resultado.path;
        } else {
          const resultado = await this.storageService.upload(
            bucket,
            archivos[campo][0],
            folder,
          );
          nuevosPaths[campo] = resultado.path;
        }
      }
    }

    // 3. Guarda los nuevos paths en PostgreSQL
    const poco = await this.documentosRepository.Actualizar(id, dto, nuevosPaths);

    // 4. Convierte los paths a presigned URLs antes de retornar
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