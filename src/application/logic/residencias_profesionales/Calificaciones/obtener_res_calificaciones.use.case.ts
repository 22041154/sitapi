import { Injectable, Inject, NotFoundException, } from '@nestjs/common';
import { IResCalificacionesRepository } from '../../../../domain/interfaces/residencias_profesionales/res_calificaciones.interface';
import { ResCalificaciones } from '../../../../dtos/POCOS/residencias_profesionales/res_calificaciones.poco';

@Injectable()
export class ObtenerResCalificacionesUseCase {

    constructor(
        @Inject('IResCalificacionesRepository')
        private readonly resCalificacionesRepository:
        IResCalificacionesRepository,
    ) {}

    async ObtenerTodos(): Promise<ResCalificaciones[]> {

        const calificaciones =
            await this.resCalificacionesRepository
                .ObtenerTodos();

        if (
            !calificaciones
            ||
            calificaciones.length === 0
        ) {
            throw new NotFoundException(
                'No se encontraron calificaciones',
            );
        }

        return calificaciones;

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResCalificaciones> {

        const calificacion =
            await this.resCalificacionesRepository
                .ObtenerPorId(id);

        if (!calificacion) {
            throw new NotFoundException(
                `No se encontró la calificación con id ${id}`,
            );
        }

        return calificacion;

    }

    async ObtenerPorAlumnoProyecto(
        idAlumnoProyecto: number,
    ): Promise<ResCalificaciones> {

        const calificacion =
            await this.resCalificacionesRepository
                .ObtenerPorAlumnoProyecto(
                    idAlumnoProyecto,
                );

        if (!calificacion) {
            throw new NotFoundException(
                `No se encontró calificación para el alumno proyecto ${idAlumnoProyecto}`,
            );
        }

        return calificacion;

    }

    async ObtenerPorMateria(
        idMateria: number,
    ): Promise<ResCalificaciones[]> {

        const calificaciones =
            await this.resCalificacionesRepository
                .ObtenerPorMateria(
                    idMateria,
                );

        if (
            !calificaciones
            ||
            calificaciones.length === 0
        ) {
            throw new NotFoundException(
                `No se encontraron calificaciones para la materia ${idMateria}`,
            );
        }

        return calificaciones;

    }

    async ObtenerPorGrupo(
        idGrupo: number,
    ): Promise<ResCalificaciones[]> {

        const calificaciones =
            await this.resCalificacionesRepository
                .ObtenerPorGrupo(
                    idGrupo,
                );

        if (
            !calificaciones
            ||
            calificaciones.length === 0
        ) {
            throw new NotFoundException(
                `No se encontraron calificaciones para el grupo ${idGrupo}`,
            );
        }

        return calificaciones;

    }

    async ObtenerPorFolioActa(
        folioActa: string,
    ): Promise<ResCalificaciones[]> {

        const calificaciones =
            await this.resCalificacionesRepository
                .ObtenerPorFolioActa(
                    folioActa,
                );

        if (
            !calificaciones
            ||
            calificaciones.length === 0
        ) {
            throw new NotFoundException(
                `No se encontraron calificaciones con el folio ${folioActa}`,
            );
        }

        return calificaciones;

    }

    async ObtenerCapturadas(): Promise<ResCalificaciones[]> {

        const calificaciones =
            await this.resCalificacionesRepository
                .ObtenerCapturadas();

        if (
            !calificaciones
            ||
            calificaciones.length === 0
        ) {
            throw new NotFoundException(
                'No se encontraron calificaciones capturadas',
            );
        }

        return calificaciones;

    }

    async ObtenerPendientesCaptura(): Promise<ResCalificaciones[]> {

        const calificaciones =
            await this.resCalificacionesRepository
                .ObtenerPendientesCaptura();

        if (
            !calificaciones
            ||
            calificaciones.length === 0
        ) {
            throw new NotFoundException(
                'No se encontraron calificaciones pendientes de captura',
            );
        }

        return calificaciones;

    }

}