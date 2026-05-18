import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';

@Injectable()
export class EliminarResEmpresasUseCase {

  constructor(
    @Inject('IResEmpresasRepository')
    private readonly ResEmpresasRepository: IResEmpresasRepository,
  ) {}

  async EliminarPorId(id: number): Promise<void> {
    const empresa = await this.ResEmpresasRepository.ObtenerPorId(id);

    if (!empresa) {
      throw new NotFoundException(`No se encontró la empresa con id ${id}`);
    }

    await this.ResEmpresasRepository.Eliminar(id);
  }

  async EliminarPorNombre(nombre: string): Promise<void> {
    const empresas = await this.ResEmpresasRepository
      .ObtenerPorNombreEmpresa(nombre);

    if (!empresas || empresas.length === 0) {
      throw new NotFoundException(`No se encontró ninguna empresa con el nombre ${nombre}`);
    }

    await this.ResEmpresasRepository.EliminarPorNombre(nombre);
  }

}