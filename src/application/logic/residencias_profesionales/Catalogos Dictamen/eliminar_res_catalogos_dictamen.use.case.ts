import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResCatalogoDictamenRepository } from '../../../../domain/interfaces/residencias_profesionales/res_catalogos_dictamen.interface';

@Injectable()
export class EliminarResCatalogoDictamenUseCase {

    constructor(
        @Inject('IResCatalogoDictamenRepository')
        private readonly resCatalogoDictamenRepository:
        IResCatalogoDictamenRepository,
    ) {}

    async Ejecutar(
        id: number,
    ): Promise<void> {

        const dictamen =
            await this.resCatalogoDictamenRepository
                .ObtenerPorId(id);

        if (!dictamen) {
            throw new NotFoundException(
                `No se encontró el dictamen con id ${id}`,
            );
        }

        await this.resCatalogoDictamenRepository
            .Eliminar(id);

    }

}