import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResSeguimientosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_seguimientos.interface';

@Injectable()
export class EliminarResSeguimientosUseCase {

    constructor(
        @Inject('IResSeguimientosRepository')
        private readonly resSeguimientosRepository:
        IResSeguimientosRepository,
    ) {}

    async EliminarPorId(
        id: number,
    ): Promise<void> {

        const seguimiento =
            await this.resSeguimientosRepository
                .ObtenerPorId(id);

        if (!seguimiento) {
            throw new NotFoundException(
                `No se encontró el seguimiento con id ${id}`,
            );
        }

        await this.resSeguimientosRepository
            .Eliminar(id);

    }

}