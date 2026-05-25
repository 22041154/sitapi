import { Injectable, Inject, ConflictException, } from '@nestjs/common';
import { IResCalificacionesRepository } from '../../../../domain/interfaces/residencias_profesionales/res_calificaciones.interface';
import { CrearResCalificacionDto } from '../../../../dtos/requests/Residencias Profesionales/res_calificaciones/crear_res_calificaciones.request';
import { ResCalificaciones } from '../../../../dtos/POCOS/residencias_profesionales/res_calificaciones.poco';

@Injectable()
export class CrearResCalificacionesUseCase {

    constructor(
        @Inject('IResCalificacionesRepository')
        private readonly resCalificacionesRepository:
        IResCalificacionesRepository,
    ) {}

    async Ejecutar(
        dto: CrearResCalificacionDto,
    ): Promise<ResCalificaciones> {

        const calificacionExistente =
            await this.resCalificacionesRepository
                .ObtenerPorAlumnoProyecto(
                    dto.id_alumno_proyecto,
                );

        if (calificacionExistente) {
            throw new ConflictException(
                `Ya existe una calificación para el alumno proyecto ${dto.id_alumno_proyecto}`,
            );
        }

        return this.resCalificacionesRepository.Crear(dto);

    }

}