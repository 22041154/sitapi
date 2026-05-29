import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { ISsProgramasRepository } from '../../../../domain/interfaces/servicio_social/ss_programas.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { CrearSsProgramaDto } from '../../../../dtos/requests/Servicio Social/Programas/crear_ss_programas';
import { SsProgramasPoco } from '../../../../dtos/POCOS/servicio_social/ss_programas.poco';

@Injectable()
export class CrearSsProgramaUseCase {

  constructor(
    @Inject('ISsProgramasRepository')
    private readonly ssProgramasRepository: ISsProgramasRepository,
    
    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  async Ejecutar(
    dto: CrearSsProgramaDto,
    archivos?: { plan_trabajo?: Express.Multer.File[] },
  ): Promise<SsProgramasPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;
    const folder = `programas/${dto.nombre_programa.replace(/\s+/g, '_')}`;

    // 1. Validar que no exista un programa con el mismo nombre
    const programasExistentes = await this.ssProgramasRepository
      .ObtenerPorNombrePrograma(dto.nombre_programa);

    const existePrograma = programasExistentes.some(
      programa => programa.nombrePrograma.toLowerCase() === dto.nombre_programa.toLowerCase()
    );

    if (existePrograma) {
      throw new ConflictException(`Ya existe un programa con el nombre ${dto.nombre_programa}`);
    }

    // 2. Subir plan_trabajo a Garage si viene
    let plan_trabajo_path: string | null = null;
    if (archivos?.plan_trabajo?.[0]) {
      const uploadResult = await this.storageService.upload(
        bucket,
        archivos.plan_trabajo[0],
        folder
      );
      plan_trabajo_path = uploadResult.path;
    }

    // 3. Guardar el path en PostgreSQL
    const programaCreado = await this.ssProgramasRepository.Crear(dto, {
      plan_trabajo: plan_trabajo_path,
    });

    if (!programaCreado) {
      throw new NotFoundException('No se pudo crear el programa');
    }

    // 4. Convertir el path a presigned URL antes de retornar
    const plan_trabajo_url = programaCreado.plan_trabajo
      ? await this.storageService.getPresignedUrl(bucket, programaCreado.plan_trabajo)
      : null;

    return new SsProgramasPoco(
      programaCreado.id,
      programaCreado.idOrganizacion,
      programaCreado.nombreOrganizacion,
      programaCreado.idTipoPrograma,
      programaCreado.nombreTipo,
      programaCreado.nombrePrograma,
      programaCreado.listaActividades,
      programaCreado.modalidad,
      programaCreado.fechaInicioServicio,
      programaCreado.fechaFinServicio,
      plan_trabajo_url,
    );
  }
}