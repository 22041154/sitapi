import {
    Injectable,
    Inject,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { IResAlumnosProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_alumnos_proyectos.interface';

import { ActualizarResAlumnoProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/actualizar_res_alumnos_proyectos.request';

import { ResAlumnosProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_alumnos_proyectos.poco';

@Injectable()
export class ActualizarResAlumnosProyectosUseCase {

    constructor(
        @Inject('IResAlumnosProyectosRepository')
        private readonly repository:
        IResAlumnosProyectosRepository,
    ) {}

    async Ejecutar(
        id: number,
        dto: ActualizarResAlumnoProyectoDto,
    ): Promise<ResAlumnosProyectos> {

        const registroExistente =
            await this.repository.ObtenerPorId(id);

        if (!registroExistente) {
            throw new NotFoundException(
                `No se encontró el registro con id ${id}`,
            );
        }

        const idProyecto =
            dto.id_proyecto ??
            registroExistente.idProyecto;

        const idAlumno =
            dto.id_alumno_academico ??
            registroExistente.idAlumnoAcademico;

        const registrosProyecto =
            await this.repository.ObtenerPorProyecto(
                idProyecto,
            );

        const existeDuplicado =
            registrosProyecto.some(
                registro =>
                    registro.id !== id &&
                    registro.idAlumnoAcademico === idAlumno,
            );

        if (existeDuplicado) {
            throw new ConflictException(
                'El alumno ya está asignado a este proyecto',
            );
        }

        return this.repository.Actualizar(
            id,
            dto,
        );

    }

}