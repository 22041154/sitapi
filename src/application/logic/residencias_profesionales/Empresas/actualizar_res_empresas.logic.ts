import { Injectable, Inject, ConflictException, NotFoundException, } from '@nestjs/common';
import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';
import { ActualizarResEmpresaDto } from '../../../../dtos/requests/Residencias Profesionales/res_empresas/actualizar_res_empresas.dto';
import { ResEmpresas } from '../../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';

@Injectable()
export class ActualizarResEmpresasUseCase {

  constructor(
    @Inject('IResEmpresasRepository')
    private readonly resEmpresasRepository: IResEmpresasRepository,
  ) {}

  async Ejecutar(
    id: number,
    dto: ActualizarResEmpresaDto,
  ): Promise<ResEmpresas> {

    const empresaExistente =
      await this.resEmpresasRepository.ObtenerPorId(id);

    if (!empresaExistente) {
      throw new NotFoundException(
        `No se encontró la empresa con id ${id}`,
      );
    }

    if (dto.nombre_empresa) {

      const empresas =
        await this.resEmpresasRepository.ObtenerPorNombreEmpresa(
          dto.nombre_empresa,
        );

      const existeEmpresa = empresas.some(
        (empresa) =>
          empresa.id !== id &&
          empresa.nombreEmpresa.trim().toLowerCase() ===
          dto.nombre_empresa.trim().toLowerCase(),
      );

      if (existeEmpresa) {
        throw new ConflictException(
          `Ya existe una empresa con el nombre ${dto.nombre_empresa}`,
        );
      }

    }

    return this.resEmpresasRepository.Actualizar(id, dto);

  }

}