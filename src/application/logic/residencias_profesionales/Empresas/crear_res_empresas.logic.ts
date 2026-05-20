import { Injectable, Inject, ConflictException, } from '@nestjs/common';
import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';
import { CrearResEmpresaDto } from '../../../../dtos/requests/Residencias Profesionales/res_empresas/crear_res_empresas.dto';
import { ResEmpresas } from '../../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';

@Injectable()
export class CrearResEmpresasUseCase {

  constructor(
    @Inject('IResEmpresasRepository')
    private readonly resEmpresasRepository: IResEmpresasRepository,
  ) {}

  async Ejecutar(
    dto: CrearResEmpresaDto,
  ): Promise<ResEmpresas> {

    const empresasExistentes =
      await this.resEmpresasRepository.ObtenerPorNombreEmpresa(
        dto.nombre_empresa,
      );

    const existeEmpresa = empresasExistentes.some(
      (empresa) =>
        empresa.nombreEmpresa.trim().toLowerCase() ===
        dto.nombre_empresa.trim().toLowerCase(),
    );

    if (existeEmpresa) {
      throw new ConflictException(
        `Ya existe una empresa con el nombre ${dto.nombre_empresa}`,
      );
    }

    return this.resEmpresasRepository.Crear(dto);

  }

}