import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResSeguimientosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_seguimientos.interface';

import { ResSeguimientos } from '../../../../dtos/POCOS/residencias_profesionales/res_seguimientos.poco';

@Injectable()
export class ObtenerResSeguimientosUseCase {

    constructor(
        @Inject('IResSeguimientosRepository')
        private readonly resSeguimientosRepository:
        IResSeguimientosRepository,
    ) {}

    async ObtenerTodos(): Promise<ResSeguimientos[]> {

        const seguimientos =
            await this.resSeguimientosRepository
                .ObtenerTodos();

        if (!seguimientos ||
            seguimientos.length === 0) {

            throw new NotFoundException(
                'No se encontraron seguimientos',
            );

        }

        return seguimientos;

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResSeguimientos> {

        const seguimiento =
            await this.resSeguimientosRepository
                .ObtenerPorId(id);

        if (!seguimiento) {
            throw new NotFoundException(
                `No se encontró el seguimiento con id ${id}`,
            );
        }

        return seguimiento;

    }

    async ObtenerPorAlumnoProyecto(
        idAlumnoProyecto: number,
    ): Promise<ResSeguimientos> {

        const seguimiento =
            await this.resSeguimientosRepository
                .ObtenerPorAlumnoProyecto(
                    idAlumnoProyecto,
                );

        if (!seguimiento) {
            throw new NotFoundException(
                `No se encontró seguimiento para el alumno proyecto con id ${idAlumnoProyecto}`,
            );
        }

        return seguimiento;

    }

}