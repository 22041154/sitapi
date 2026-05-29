import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISsProgramasRepository } from '../../../../domain/interfaces/servicio_social/ss_programas.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';

@Injectable()
export class EliminarSsProgramasUseCase {
  constructor(
    @Inject('ISsProgramasRepository')
    private readonly ssProgramasRepository: ISsProgramasRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  async Ejecutar(id: number): Promise<void> {
    // 1. Obtener los paths del programa
    const paths = await this.ssProgramasRepository.ObtenerPathsPorId(id);

    if (!paths) {
      throw new NotFoundException(`No se encontró el programa con el id ${id}`);
    }

    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;

    // 2. Eliminar el plan_trabajo de Garage si existe
    if (paths.plan_trabajo) {
      await this.storageService.delete(bucket, paths.plan_trabajo);
    }

    // 3. Eliminar el registro de PostgreSQL
    await this.ssProgramasRepository.Eliminar(id);
  }
}