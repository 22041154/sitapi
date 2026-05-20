import { Injectable, Inject, NotFoundException, } from '@nestjs/common';
import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';

@Injectable()
export class EliminarResEmpresasUseCase {

  constructor(
    @Inject('IResEmpresasRepository')
    private readonly resEmpresasRepository: IResEmpresasRepository,
  ) {}

  async EliminarPorId(
    id: number,
  ): Promise<void> {

    const empresa = await this.resEmpresasRepository.ObtenerPorId(id);

    if (!empresa) {
      throw new NotFoundException(
        `No se encontró la empresa con id ${id}`,
      );
    }

    await this.resEmpresasRepository.Eliminar(id);

  }

  async EliminarPorNombre(
    nombre: string,
  ): Promise<void> {

    const empresas =
      await this.resEmpresasRepository.ObtenerPorNombreEmpresa(nombre);

    if (empresas.length === 0) {
      throw new NotFoundException(
        `No se encontró ninguna empresa con el nombre ${nombre}`,
      );
    }

    await this.resEmpresasRepository.EliminarPorNombre(nombre);

  }

}