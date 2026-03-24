import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISsPermisosRepository } from '../../../../domain/interfaces/servicio_social/ss_permisos.interface';

@Injectable()
export class EliminarSsPermisosUseCase {
  constructor(
    @Inject('ISsPermisosRepository')
    private readonly ssPermisosRepository: ISsPermisosRepository,
  ) {}

  async Ejecutar(id: number): Promise<void> {
    // Verificamos si existe el permiso
    const permisoExistente = await this.ssPermisosRepository.ObtenerPorId(id);
    
    if (!permisoExistente) {
      throw new NotFoundException(`No se encontró el permiso con el id ${id}`);
    }

    // Si existe, lo borramos
    await this.ssPermisosRepository.Eliminar(id);
  }
}