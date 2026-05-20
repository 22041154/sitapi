import { Injectable, Inject, NotFoundException, ConflictException, } from '@nestjs/common';
import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';
import { ActualizarResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/actualizar_res_proyecto.dto';
import { ResProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

@Injectable()
export class ActualizarResProyectosUseCase {

    constructor(
        @Inject('IResProyectosRepository')
        private readonly resProyectosRepository: IResProyectosRepository,
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

        if (dto.descripcion && dto.id_empresa) {

            const proyectosEmpresa =
                await this.resProyectosRepository.ObtenerPorEmpresa(
                    dto.id_empresa,
                );

            const existeProyectoDuplicado =
                proyectosEmpresa.some(
                    proyecto =>
                        proyecto.id !== id &&
                        proyecto.descripcion?.trim().toLowerCase() ===
                        dto.descripcion?.trim().toLowerCase(),
                );

            if (existeProyectoDuplicado) {
                throw new ConflictException(
                    'Ya existe un proyecto con la misma descripción para esta empresa',
                );
            }

        }

        return this.resProyectosRepository.Actualizar(
            id,
            dto,
        );

    }

}