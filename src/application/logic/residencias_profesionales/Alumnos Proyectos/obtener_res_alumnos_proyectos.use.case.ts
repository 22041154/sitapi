import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResAlumnosProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_alumnos_proyectos.interface';

import { ResAlumnosProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_alumnos_proyectos.poco';

@Injectable()
export class ObtenerResAlumnosProyectosUseCase {

    constructor(
        @Inject('IResAlumnosProyectosRepository')
        private readonly repository:
        IResAlumnosProyectosRepository,
    ) {}

    async ObtenerTodos(): Promise<ResAlumnosProyectos[]> {

        const registros =
            await this.repository.ObtenerTodos();

        if (!registros || registros.length === 0) {
            throw new NotFoundException(
                'No se encontraron registros de alumnos proyectos',
            );
        }

        return registros;

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResAlumnosProyectos> {

        const registro =
            await this.repository.ObtenerPorId(id);

        if (!registro) {
            throw new NotFoundException(
                `No se encontró el registro con id ${id}`,
            );
        }

        return registro;

    }

    async ObtenerPorProyecto(
        idProyecto: number,
    ): Promise<ResAlumnosProyectos[]> {

        const registros =
            await this.repository.ObtenerPorProyecto(
                idProyecto,
            );

        if (!registros || registros.length === 0) {
            throw new NotFoundException(
                `No se encontraron registros para el proyecto ${idProyecto}`,
            );
        }

        return registros;

    }

    async ObtenerPorAlumno(
        idAlumnoAcademico: number,
    ): Promise<ResAlumnosProyectos[]> {

        const registros =
            await this.repository.ObtenerPorAlumno(
                idAlumnoAcademico,
            );

        if (!registros || registros.length === 0) {
            throw new NotFoundException(
                `No se encontraron registros para el alumno ${idAlumnoAcademico}`,
            );
        }

        return registros;

    }

    async ObtenerPorAsesorInterno(
        idAsesorInterno: number,
    ): Promise<ResAlumnosProyectos[]> {

        const registros =
            await this.repository.ObtenerPorAsesorInterno(
                idAsesorInterno,
            );

        if (!registros || registros.length === 0) {
            throw new NotFoundException(
                `No se encontraron registros para el asesor interno ${idAsesorInterno}`,
            );
        }

        return registros;

    }

    async ObtenerPorDictamen(
        idCatalogoDictamen: number,
    ): Promise<ResAlumnosProyectos[]> {

        const registros =
            await this.repository.ObtenerPorDictamen(
                idCatalogoDictamen,
            );

        if (!registros || registros.length === 0) {
            throw new NotFoundException(
                `No se encontraron registros para el dictamen ${idCatalogoDictamen}`,
            );
        }

        return registros;

    }

}