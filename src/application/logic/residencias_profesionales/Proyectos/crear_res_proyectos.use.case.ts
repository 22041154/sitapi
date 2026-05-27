import {
    Injectable,
    Inject,
    ConflictException,
} from '@nestjs/common';

import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';

import { CrearResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';

import { ResProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

@Injectable()
export class CrearResProyectosUseCase {

    constructor(
        @Inject('IResProyectosRepository')
        private readonly resProyectosRepository:
        IResProyectosRepository,
    ) {}

    async Ejecutar(
        dto: CrearResProyectoDto,
    ): Promise<ResProyectos> {

        const proyectosEmpresa =
            await this.resProyectosRepository
                .ObtenerPorEmpresa(dto.id_empresa);

        const existeFolio =
            proyectosEmpresa.some(
                proyecto =>
                    proyecto.folio.trim().toLowerCase() ===
                    dto.folio.trim().toLowerCase(),
            );

        if (existeFolio) {
            throw new ConflictException(
                `Ya existe un proyecto con el folio ${dto.folio} para esta empresa`,
            );
        }

        const existeNombre =
            proyectosEmpresa.some(
                proyecto =>
                    proyecto.nombre.trim().toLowerCase() ===
                    dto.nombre.trim().toLowerCase(),
            );

        if (existeNombre) {
            throw new ConflictException(
                `Ya existe un proyecto con el nombre ${dto.nombre} para esta empresa`,
            );
        }

        return this.resProyectosRepository.Crear(dto);

    }

}