import { Injectable, Inject, ConflictException, } from '@nestjs/common';
import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';
import { CrearResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';
import { ResProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

@Injectable()
export class CrearResProyectosUseCase {

    constructor(
        @Inject('IResProyectosRepository')
        private readonly resProyectosRepository: IResProyectosRepository,
    ) {}

    async Ejecutar(
        dto: CrearResProyectoDto,
    ): Promise<ResProyectos> {

        const proyectosExistentes =
            await this.resProyectosRepository.ObtenerPorEmpresa(
                dto.id_empresa,
            );

        const existeProyecto =
            proyectosExistentes.some(
                proyecto =>
                    proyecto.descripcion?.trim().toLowerCase() ===
                    dto.descripcion?.trim().toLowerCase(),
            );

        if (existeProyecto) {
            throw new ConflictException(
                `Ya existe un proyecto con la misma descripción para esta empresa`,
            );
        }

        return this.resProyectosRepository.Crear(dto);

    }

}