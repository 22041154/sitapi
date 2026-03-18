import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISsOrganizacionesRepository } from '../../../../domain/interfaces/servicio_social/ss_organizaciones';

@Injectable()
export class EliminarSsOrganizacionUseCase {

  constructor(
    @Inject('ISsOrganizacionesRepository')
    private readonly ssOrganizacionesRepository: ISsOrganizacionesRepository,
  ) {}

  async EliminarPorId(id: number): Promise<void> {
    const organizacion = await this.ssOrganizacionesRepository.ObtenerPorId(id);

    if (!organizacion) {
      throw new NotFoundException(`No se encontró la organización con id ${id}`);
    }

    await this.ssOrganizacionesRepository.Eliminar(id);
  }

  async EliminarPorNombre(nombre: string): Promise<void> {
    const organizaciones = await this.ssOrganizacionesRepository
      .ObtenerPorNombreOrganizacion(nombre);

    if (!organizaciones || organizaciones.length === 0) {
      throw new NotFoundException(`No se encontró ninguna organización con el nombre ${nombre}`);
    }

    await this.ssOrganizacionesRepository.EliminarPorNombre(nombre);
  }

}