import { Injectable, Inject, ConflictException, } from '@nestjs/common';
import { IResAsesorIntProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_asesor_int_proyecto.interface';
import { CrearResAsesorIntProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/res_asesor_int_proyecto.dto';
import { ResAsesorIntProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_asesor_int_proyecto';

@Injectable()
export class CrearResAsesorIntProyectosUseCase {

    constructor(
        @Inject('IResAsesorIntProyectosRepository')
        private readonly resAsesorIntProyectosRepository:
        IResAsesorIntProyectosRepository,
    ) {}

    async Ejecutar(
        dto: CrearResAsesorIntProyectoDto,
    ): Promise<ResAsesorIntProyectos> {

        const asignacionExistente =
            await this.resAsesorIntProyectosRepository
                .ObtenerAsignacion(
                    dto.id_proyecto,
                    dto.id_personal_academico,
                );

        if (asignacionExistente) {
            throw new ConflictException(
                'El asesor ya se encuentra asignado a este proyecto',
            );
        }

        const proyectoConAsesores =
            await this.resAsesorIntProyectosRepository
                .ObtenerPorProyecto(
                    dto.id_proyecto,
                );

        if (proyectoConAsesores.length > 0) {
            throw new ConflictException(
                'El proyecto ya tiene un asesor interno asignado',
            );
        }

        return this.resAsesorIntProyectosRepository.Crear(
            dto,
        );

    }

}