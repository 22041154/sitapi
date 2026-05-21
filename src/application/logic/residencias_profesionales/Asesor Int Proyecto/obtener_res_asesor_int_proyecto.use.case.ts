import { Injectable, Inject, NotFoundException, } from '@nestjs/common';
import { IResAsesorIntProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_asesor_int_proyecto.interface';
import { ResAsesorIntProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_asesor_int_proyecto';

@Injectable()
export class ObtenerResAsesorIntProyectosUseCase {

    constructor(
        @Inject('IResAsesorIntProyectosRepository')
        private readonly resAsesorIntProyectosRepository:
        IResAsesorIntProyectosRepository,
    ) {}

    async ObtenerTodos(): Promise<ResAsesorIntProyectos[]> {

        const asignaciones =
            await this.resAsesorIntProyectosRepository
                .ObtenerTodos();

        if (!asignaciones || asignaciones.length === 0) {
            throw new NotFoundException(
                'No se encontraron asignaciones de asesores internos',
            );
        }

        return asignaciones;

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResAsesorIntProyectos> {

        const asignacion =
            await this.resAsesorIntProyectosRepository
                .ObtenerPorId(id);

        if (!asignacion) {
            throw new NotFoundException(
                `No se encontró la asignación con id ${id}`,
            );
        }

        return asignacion;

    }

    async ObtenerPorProyecto(
        idProyecto: number,
    ): Promise<ResAsesorIntProyectos[]> {

        const asignaciones =
            await this.resAsesorIntProyectosRepository
                .ObtenerPorProyecto(idProyecto);

        if (!asignaciones || asignaciones.length === 0) {
            throw new NotFoundException(
                `No se encontraron asesores para el proyecto con id ${idProyecto}`,
            );
        }

        return asignaciones;

    }

    async ObtenerPorPersonalAcademico(
        idPersonal: number,
    ): Promise<ResAsesorIntProyectos[]> {

        const asignaciones =
            await this.resAsesorIntProyectosRepository
                .ObtenerPorPersonalAcademico(idPersonal);

        if (!asignaciones || asignaciones.length === 0) {
            throw new NotFoundException(
                `No se encontraron proyectos asignados al personal académico con id ${idPersonal}`,
            );
        }

        return asignaciones;

    }

    async ObtenerAsignacion(
        idProyecto: number,
        idPersonal: number,
    ): Promise<ResAsesorIntProyectos> {

        const asignacion =
            await this.resAsesorIntProyectosRepository
                .ObtenerAsignacion(
                    idProyecto,
                    idPersonal,
                );

        if (!asignacion) {
            throw new NotFoundException(
                'No se encontró la asignación especificada',
            );
        }

        return asignacion;

    }

}