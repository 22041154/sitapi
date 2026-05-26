import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';

import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';
import { ActualizarResEmpresaDto } from '../../../../dtos/requests/Residencias Profesionales/res_empresas/actualizar_res_empresas.dto';
import { ResEmpresas } from '../../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';

@Injectable()
export class ActualizarResEmpresasUseCase {

    constructor(
        @Inject('IResEmpresasRepository')
        private readonly resEmpresasRepository:
        IResEmpresasRepository,
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

        const nombreValidar =
            dto.nombre || empresaExistente.nombre;

        const localizacionValidar =
            dto.localizacion || empresaExistente.localizacion;

        const empresas =
            await this.resEmpresasRepository.ObtenerPorNombre(
                nombreValidar,
            );

        const existeEmpresa =
            empresas.some(
                (empresa) =>
                    empresa.id !== id
                    &&
                    empresa.nombre.trim().toLowerCase() ===
                    nombreValidar.trim().toLowerCase()
                    &&
                    (empresa.localizacion?.trim().toLowerCase() || '') ===
                    (localizacionValidar?.trim().toLowerCase() || ''),
            );

        if (existeEmpresa) {
            throw new ConflictException(
                `Ya existe una empresa con el nombre ${nombreValidar} en la misma localización`,
            );
        }

        return this.resEmpresasRepository.Actualizar(
            id,
            dto,
        );

    }

}