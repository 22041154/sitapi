import { Injectable, Inject, NotFoundException, ConflictException, } from '@nestjs/common';
import { IResAsesorIntProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_asesor_int_proyecto.interface';
import { ActualizarResAsesorIntProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/actualizar_res_asesor_int_proyecto.dto';
import { ResAsesorIntProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_asesor_int_proyecto';

@Injectable()
export class ActualizarResAsesorIntProyectosUseCase {

    constructor(
        @Inject('IResAsesorIntProyectosRepository')
        private readonly resAsesorIntProyectosRepository:
        IResAsesorIntProyectosRepository,
    ) {}

    async Ejecutar(
        id: number,
        dto: ActualizarResAsesorIntProyectoDto,
    ): Promise<ResAsesorIntProyectos> {

        const asignacionExistente =
            await this.resAsesorIntProyectosRepository
                .ObtenerPorId(id);

        if (!asignacionExistente) {
            throw new NotFoundException(
                `No se encontró la asignación con id ${id}`,
            );
        }

        if (
            dto.id_proyecto &&
            dto.id_personal_academico
        ) {

            const asignacionDuplicada =
                await this.resAsesorIntProyectosRepository
                    .ObtenerAsignacion(
                        dto.id_proyecto,
                        dto.id_personal_academico,
                    );

            if (
                asignacionDuplicada &&
                asignacionDuplicada.id !== id
            ) {
                throw new ConflictException(
                    'El asesor ya está asignado a este proyecto',
                );
            }

            const asesoresProyecto =
                await this.resAsesorIntProyectosRepository
                    .ObtenerPorProyecto(
                        dto.id_proyecto,
                    );

            const proyectoYaAsignado =
                asesoresProyecto.some(
                    asignacion =>
                        asignacion.id !== id,
                );

            if (proyectoYaAsignado) {
                throw new ConflictException(
                    'El proyecto ya tiene un asesor interno asignado',
                );
            }

        }

        return this.resAsesorIntProyectosRepository
            .Actualizar(
                id,
                dto,
            );

    }

}