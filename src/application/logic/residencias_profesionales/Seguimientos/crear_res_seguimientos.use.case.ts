import {
    Injectable,
    Inject,
    ConflictException,
} from '@nestjs/common';

import { IResSeguimientosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_seguimientos.interface';

import { CrearResSeguimientoDto } from '../../../../dtos/requests/Residencias Profesionales/res_seguimientos/crear_res_seguimientos.request';

import { ResSeguimientos } from '../../../../dtos/POCOS/residencias_profesionales/res_seguimientos.poco';

@Injectable()
export class CrearResSeguimientosUseCase {

    constructor(
        @Inject('IResSeguimientosRepository')
        private readonly resSeguimientosRepository:
        IResSeguimientosRepository,
    ) {}

    async Ejecutar(
        dto: CrearResSeguimientoDto,
    ): Promise<ResSeguimientos> {

        const seguimientoExistente =
            await this.resSeguimientosRepository
                .ObtenerPorAlumnoProyecto(
                    dto.id_alumno_proyecto,
                );

        if (seguimientoExistente) {
            throw new ConflictException(
                `Ya existe un seguimiento para el alumno proyecto con id ${dto.id_alumno_proyecto}`,
            );
        }

        return this.resSeguimientosRepository.Crear(
            dto,
        );

    }

}