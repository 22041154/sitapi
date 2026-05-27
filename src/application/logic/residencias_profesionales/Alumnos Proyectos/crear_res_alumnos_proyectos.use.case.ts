import {
    Injectable,
    Inject,
    ConflictException,
} from '@nestjs/common';

import { IResAlumnosProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_alumnos_proyectos.interface';

import { CrearResAlumnoProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/crear_res_alumnos_proyectos.request';

import { ResAlumnosProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_alumnos_proyectos.poco';

@Injectable()
export class CrearResAlumnosProyectosUseCase {

    constructor(
        @Inject('IResAlumnosProyectosRepository')
        private readonly repository: IResAlumnosProyectosRepository,
    ) {}

    async Ejecutar(
        dto: CrearResAlumnoProyectoDto,
    ): Promise<ResAlumnosProyectos> {

        const registrosProyecto =
            await this.repository.ObtenerPorProyecto(dto.id_proyecto);

        const existeAlumno =
            registrosProyecto.some(
                r => r.idAlumnoAcademico === dto.id_alumno_academico,
            );

        if (existeAlumno) {
            throw new ConflictException(
                `El alumno ya está asignado a este proyecto`,
            );
        }

        return this.repository.Crear(dto);

    }

}