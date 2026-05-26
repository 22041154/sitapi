import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResCatalogoDictamenRepository } from '../../../../domain/interfaces/residencias_profesionales/res_catalogos_dictamen.interface';

import { ResCatalogoDictamen } from '../../../../dtos/POCOS/residencias_profesionales/res_catalogo_dictamen.poco';

@Injectable()
export class ObtenerResCatalogoDictamenUseCase {

    constructor(
        @Inject('IResCatalogoDictamenRepository')
        private readonly resCatalogoDictamenRepository:
        IResCatalogoDictamenRepository,
    ) {}

    async ObtenerTodos(): Promise<ResCatalogoDictamen[]> {

        const dictamenes =
            await this.resCatalogoDictamenRepository
                .ObtenerTodos();

        if (dictamenes.length === 0) {
            throw new NotFoundException(
                'No se encontraron dictámenes',
            );
        }

        return dictamenes;

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResCatalogoDictamen> {

        const dictamen =
            await this.resCatalogoDictamenRepository
                .ObtenerPorId(id);

        if (!dictamen) {
            throw new NotFoundException(
                `No se encontró el dictamen con id ${id}`,
            );
        }

        return dictamen;

    }

    async ObtenerPorNombre(
        nombre: string,
    ): Promise<ResCatalogoDictamen[]> {

        const dictamenes =
            await this.resCatalogoDictamenRepository
                .ObtenerPorNombre(nombre);

        if (dictamenes.length === 0) {
            throw new NotFoundException(
                `No se encontraron dictámenes con el nombre ${nombre}`,
            );
        }

        return dictamenes;

    }

}