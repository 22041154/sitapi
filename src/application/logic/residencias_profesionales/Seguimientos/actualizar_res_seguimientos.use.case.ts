import {
    Injectable,
    Inject,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { IResSeguimientosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_seguimientos.interface';

import { ActualizarResSeguimientoDto } from '../../../../dtos/requests/Residencias Profesionales/res_seguimientos/actualizar_res_siguimientos.request';

import { ResSeguimientos } from '../../../../dtos/POCOS/residencias_profesionales/res_seguimientos.poco';

@Injectable()
export class ActualizarResSeguimientosUseCase {

    constructor(
        @Inject('IResSeguimientosRepository')
        private readonly resSeguimientosRepository:
        IResSeguimientosRepository,
    ) {}

    async Ejecutar(
        id: number,
        dto: ActualizarResSeguimientoDto,
    ): Promise<ResSeguimientos> {

        const seguimientoExistente =
            await this.resSeguimientosRepository
                .ObtenerPorId(id);

        if (!seguimientoExistente) {
            throw new NotFoundException(
                `No se encontró el seguimiento con id ${id}`,
            );
        }

        if (dto.id_alumno_proyecto) {

            const seguimientoAlumnoProyecto =
                await this.resSeguimientosRepository
                    .ObtenerPorAlumnoProyecto(
                        dto.id_alumno_proyecto,
                    );

            if (
                seguimientoAlumnoProyecto &&
                seguimientoAlumnoProyecto.id !== id
            ) {

                throw new ConflictException(
                    `Ya existe un seguimiento para el alumno proyecto con id ${dto.id_alumno_proyecto}`,
                );

            }

        }

        return this.resSeguimientosRepository
            .Actualizar(
                id,
                dto,
            );

    }

}