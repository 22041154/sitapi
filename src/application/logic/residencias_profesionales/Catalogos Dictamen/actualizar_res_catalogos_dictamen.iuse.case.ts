import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';

import { IResCatalogoDictamenRepository } from '../../../../domain/interfaces/residencias_profesionales/res_catalogos_dictamen.interface';

import { ActualizarResCatalogoDictamenDto } from '../../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/actualizar_res_catalogos_dictamen.request';

import { ResCatalogoDictamen } from '../../../../dtos/POCOS/residencias_profesionales/res_catalogo_dictamen.poco';

@Injectable()
export class ActualizarResCatalogoDictamenUseCase {

    constructor(
        @Inject('IResCatalogoDictamenRepository')
        private readonly resCatalogoDictamenRepository:
        IResCatalogoDictamenRepository,
    ) {}

    async Ejecutar(
        id: number,
        dto: ActualizarResCatalogoDictamenDto,
    ): Promise<ResCatalogoDictamen> {

        const dictamenExistente =
            await this.resCatalogoDictamenRepository
                .ObtenerPorId(id);

        if (!dictamenExistente) {
            throw new NotFoundException(
                `No se encontró el dictamen con id ${id}`,
            );
        }

        if (dto.nombre) {

            const dictamenes =
                await this.resCatalogoDictamenRepository
                    .ObtenerPorNombre(dto.nombre);

            const existeDictamen =
                dictamenes.some(
                    (dictamen) =>
                        dictamen.id !== id &&
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

        }

        return this.resCatalogoDictamenRepository
            .Actualizar(id, dto);

    }

}