import {
    Injectable,
    Inject,
    ConflictException,
} from '@nestjs/common';

import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';
import { CrearResEmpresaDto } from '../../../../dtos/requests/Residencias Profesionales/res_empresas/crear_res_empresas.dto';
import { ResEmpresas } from '../../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';

@Injectable()
export class CrearResEmpresasUseCase {

    constructor(
        @Inject('IResEmpresasRepository')
        private readonly resEmpresasRepository:
        IResEmpresasRepository,
    ) {}

    async Ejecutar(
        dto: CrearResEmpresaDto,
    ): Promise<ResEmpresas> {

        const empresasExistentes =
            await this.resEmpresasRepository.ObtenerPorNombre(
                dto.nombre,
            );

        const existeEmpresa =
            empresasExistentes.some(
                (empresa) =>
                    empresa.nombre.trim().toLowerCase() ===
                    dto.nombre.trim().toLowerCase()
                    &&
                    (empresa.localizacion?.trim().toLowerCase() || '') ===
                    (dto.localizacion?.trim().toLowerCase() || ''),
            );

        if (existeEmpresa) {
            throw new ConflictException(
                `Ya existe una empresa con el nombre ${dto.nombre} en la misma localización`,
            );
        }

        return this.resEmpresasRepository.Crear(dto);

    }

}