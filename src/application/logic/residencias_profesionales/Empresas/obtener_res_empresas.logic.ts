import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';
import { ResEmpresas } from '../../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';

@Injectable()
export class ObtenerResEmpresasUseCase {

  constructor(
    @Inject('IResEmpresasRepository')
    private readonly ResEmpresasRepository: IResEmpresasRepository,
  ) {}

  async ObtenerTodos(): Promise<ResEmpresas[]> {
    const empresas = await this.ResEmpresasRepository.ObtenerTodos();

    if (!empresas || empresas.length === 0) {
      throw new NotFoundException('No se encontraron empresas');
    }

    return empresas;
  }

  async ObtenerPorId(id: number): Promise<ResEmpresas> {
    const empresa = await this.ResEmpresasRepository.ObtenerPorId(id);

    if (!empresa) {
      throw new NotFoundException(`No se encontró la empresa con id ${id}`);
    }

    return empresa;
  }

  async ObtenerPorNombreEmpresa(nombre: string): Promise<ResEmpresas[]> {
    const empresas = await this.ResEmpresasRepository.ObtenerPorNombreEmpresa(nombre);

    if (!empresas || empresas.length === 0) {
      throw new NotFoundException(`No se encontraron empresas con el nombre ${nombre}`);
    }

    return empresas;
  }

  async ObtenerPorNombreResponsable(nombreResponsable: string): Promise<ResEmpresas[]> {
    const empresas = await this.ResEmpresasRepository.ObtenerPorResponsable(nombreResponsable);

    if (!empresas || empresas.length === 0) {
      throw new NotFoundException(`No se encontraron empresas con el responsable ${nombreResponsable}`);
    }

    return empresas;
  }

}