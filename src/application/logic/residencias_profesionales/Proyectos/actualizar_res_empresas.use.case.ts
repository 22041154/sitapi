import {
    Injectable,
    Inject,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';

import { ActualizarResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/actualizar_res_proyecto.dto';

import { ResProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

@Injectable()
export class ActualizarResProyectosUseCase {

    constructor(
        @Inject('IResProyectosRepository')
        private readonly resProyectosRepository:
        IResProyectosRepository,
    ) {}

    async Ejecutar(
        id: number,
        dto: ActualizarResProyectoDto,
    ): Promise<ResProyectos> {

        const proyectoExistente =
            await this.resProyectosRepository.ObtenerPorId(id);

        if (!proyectoExistente) {
            throw new NotFoundException(
                `No se encontró el proyecto con id ${id}`,
            );
        }

        if (dto.folio) {

            const proyectosEmpresa =
                await this.resProyectosRepository.ObtenerPorEmpresa(
                    dto.id_empresa ?? proyectoExistente.idEmpresa,
                );

            const existeFolioDuplicado =
                proyectosEmpresa.some(
                    proyecto =>
                        proyecto.id !== id &&
                        proyecto.folio.trim().toLowerCase() ===
                        dto.folio.trim().toLowerCase(),
                );

            if (existeFolioDuplicado) {
                throw new ConflictException(
                    `Ya existe un proyecto con el folio ${dto.folio} para esta empresa`,
                );
            }

        }

        if (dto.nombre) {

            const proyectosEmpresa =
                await this.resProyectosRepository.ObtenerPorEmpresa(
                    dto.id_empresa ?? proyectoExistente.idEmpresa,
                );

            const existeNombreDuplicado =
                proyectosEmpresa.some(
                    proyecto =>
                        proyecto.id !== id &&
                        proyecto.nombre.trim().toLowerCase() ===
                        dto.nombre.trim().toLowerCase(),
                );

            if (existeNombreDuplicado) {
                throw new ConflictException(
                    `Ya existe un proyecto con el nombre ${dto.nombre} para esta empresa`,
                );
            }

        }

        return this.resProyectosRepository.Actualizar(
            id,
            dto,
        );

    }

}