import {
    Injectable,
    Inject,
    ConflictException,
} from '@nestjs/common';

import { IResCatalogoDictamenRepository } from '../../../../domain/interfaces/residencias_profesionales/res_catalogos_dictamen.interface';

import { CrearResCatalogoDictamenDto } from '../../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/crear_res_catalogos_dictamen.request';

import { ResCatalogoDictamen } from '../../../../dtos/POCOS/residencias_profesionales/res_catalogo_dictamen.poco';

@Injectable()
export class CrearResCatalogoDictamenUseCase {

    constructor(
        @Inject('IResCatalogoDictamenRepository')
        private readonly resCatalogoDictamenRepository:
        IResCatalogoDictamenRepository,
    ) {}

    async Ejecutar(
        dto: CrearResCatalogoDictamenDto,
    ): Promise<ResCatalogoDictamen> {

        const dictamenesExistentes =
            await this.resCatalogoDictamenRepository
                .ObtenerPorNombre(dto.nombre);

        const existeDictamen =
            dictamenesExistentes.some(
                (dictamen) =>
                    dictamen.nombre
                        .trim()
                        .toLowerCase() ===
                    dto.nombre
                        .trim()
                        .toLowerCase(),
            );

        if (existeDictamen) {
            throw new ConflictException(
                `Ya existe un dictamen con el nombre ${dto.nombre}`,
            );
        }

        return this.resCatalogoDictamenRepository
            .Crear(dto);

    }

}