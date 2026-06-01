import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ISsProgramasRepository } from '../../../../domain/interfaces/servicio_social/ss_programas.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { ActualizarSsProgramaDto } from '../../../../dtos/requests/Servicio Social/Programas/avtualizar_ss_programas';
import { SsProgramasPoco } from '../../../../dtos/POCOS/servicio_social/ss_programas.poco';
import { PeriodosEscolaresRepository } from '../../../../infrastructure/bd/repositories/catalogos/periodos_escolares.entity';

@Injectable()
export class ActualizarSsProgramaUseCase {

  constructor(
    @Inject('ISsProgramasRepository')
    private readonly ssProgramasRepository: ISsProgramasRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,

    private readonly periodosRepository: PeriodosEscolaresRepository,
  ) {}

  async Ejecutar(
    id: number,
    dto: ActualizarSsProgramaDto,
    archivos?: { plan_trabajo?: Express.Multer.File[] },
  ): Promise<SsProgramasPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;

    // 1. Verificar existencia del programa
    const programaExistente = await this.ssProgramasRepository.ObtenerPorId(id);
    if (!programaExistente) {
      throw new NotFoundException(`No se encontró el programa con id ${id}`);
    }

    // 2. Validar conflicto de nombre si está cambiando
    if (dto.nombre_programa) {
      const programasConMismoNombre = await this.ssProgramasRepository
        .ObtenerPorNombrePrograma(dto.nombre_programa);
      const existeConflicto = programasConMismoNombre.some(
        p => p.nombrePrograma.toLowerCase() === dto.nombre_programa.toLowerCase()
          && p.id !== id,
      );
      if (existeConflicto) {
        throw new ConflictException(
          `Ya existe un programa con el nombre ${dto.nombre_programa}`,
        );
      }
    }

    // 3. Obtener paths actuales
    const pathsActuales = await this.ssProgramasRepository.ObtenerPathsPorId(id);
    if (!pathsActuales) {
      throw new NotFoundException(`No se encontró el programa con id ${id}`);
    }

    // 4. Obtener periodo activo y construir la carpeta
    // Usa el nombre nuevo si viene en el DTO, si no usa el nombre actual
    const periodoActivo = await this.periodosRepository.ObtenerPeriodoActivo();
    const nombrePrograma = dto.nombre_programa ?? programaExistente.nombrePrograma;
    const nombreProgramaNormalizado = nombrePrograma.replace(/\s+/g, '_');
    const folder = `ServicioSocial/${periodoActivo}/Programas/${nombreProgramaNormalizado}`;

    // 5. Procesar plan_trabajo si viene archivo nuevo
    let nuevoPath: string | null = undefined;

    if (archivos?.plan_trabajo?.[0]) {
      const pathViejo = pathsActuales.plan_trabajo;

      if (pathViejo) {
        // Reemplaza el archivo existente con nombre fijo
        const resultado = await this.storageService.replace(
          bucket,
          pathViejo,
          archivos.plan_trabajo[0],
          folder,
          'plan_trabajo',  // ← nombre fijo
        );
        nuevoPath = resultado.path;
      } else {
        // No había archivo antes, sube con nombre fijo
        const resultado = await this.storageService.upload(
          bucket,
          archivos.plan_trabajo[0],
          folder,
          'plan_trabajo',  // ← nombre fijo
        );
        nuevoPath = resultado.path;
      }
    }

    // 6. Guardar cambios en PostgreSQL
    const programaActualizado = await this.ssProgramasRepository.Actualizar(
      id,
      dto,
      { plan_trabajo: nuevoPath },
    );

    // 7. Convertir path a presigned URL antes de retornar
    const plan_trabajo_url = programaActualizado.plan_trabajo
      ? await this.storageService.getPresignedUrl(bucket, programaActualizado.plan_trabajo)
      : null;

    return new SsProgramasPoco(
      programaActualizado.id,
      programaActualizado.idOrganizacion,
      programaActualizado.nombreOrganizacion,
      programaActualizado.idTipoPrograma,
      programaActualizado.nombreTipo,
      programaActualizado.nombrePrograma,
      programaActualizado.listaActividades,
      programaActualizado.modalidad,
      programaActualizado.fechaInicioServicio,
      programaActualizado.fechaFinServicio,
      plan_trabajo_url,
    );
  }
}