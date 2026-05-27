import { Injectable, Inject, NotFoundException, ConflictException, } from '@nestjs/common';
import { IResCalificacionesRepository } from '../../../../domain/interfaces/residencias_profesionales/res_calificaciones.interface';
import { ActualizarResCalificacionDto } from '../../../../dtos/requests/Residencias Profesionales/res_calificaciones/actualizar_res_calificaciones.request';
import { ResCalificaciones } from '../../../../dtos/POCOS/residencias_profesionales/res_calificaciones.poco';

@Injectable()
export class ActualizarResCalificacionesUseCase {

    constructor(
        @Inject('IResCalificacionesRepository')
        private readonly resCalificacionesRepository:
        IResCalificacionesRepository,
    ) {}

    async Ejecutar(
        id: number,
        dto: ActualizarResCalificacionDto,
    ): Promise<ResCalificaciones> {

        const calificacionExistente =
            await this.resCalificacionesRepository
                .ObtenerPorId(id);

        if (!calificacionExistente) {
            throw new NotFoundException(
                `No se encontró la calificación con id ${id}`,
            );
        }

        if (
            dto.id_alumno_proyecto
            &&
            dto.id_alumno_proyecto !==
            calificacionExistente.idAlumnoProyecto
        ) {

            const existeAlumnoProyecto =
                await this.resCalificacionesRepository
                    .ObtenerPorAlumnoProyecto(
                        dto.id_alumno_proyecto,
                    );

            if (existeAlumnoProyecto) {
                throw new ConflictException(
                    `Ya existe una calificación para el alumno proyecto ${dto.id_alumno_proyecto}`,
                );
            }

        }

        if (
            calificacionExistente.EstaCapturada
            &&
            (
                dto.calificacion !== undefined
                ||
                dto.folio_acta_residencia !== undefined
                ||
                dto.id_materia !== undefined
                ||
                dto.id_grupo !== undefined
            )
        ) {
            throw new ConflictException(
                'La calificación ya fue capturada oficialmente y no puede modificarse',
            );
        }

        return this.resCalificacionesRepository
            .Actualizar(
                id,
                dto,
            );

    }

}