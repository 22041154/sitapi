import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
    Repository,
} from 'typeorm';

import { ResSeguimientosEntity } from '../../entities/residencias_profesionales/res_seguimientos.entity';

import { ResSeguimientos } from '../../../../dtos/POCOS/residencias_profesionales/res_seguimientos.poco';

import { IResSeguimientosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_seguimientos.interface';

import { CrearResSeguimientoDto } from '../../../../dtos/requests/Residencias Profesionales/res_seguimientos/crear_res_seguimientos.request';

import { ActualizarResSeguimientoDto } from '../../../../dtos/requests/Residencias Profesionales/res_seguimientos/actualizar_res_siguimientos.request';

@Injectable()
export class ResSeguimientosRepository
    implements IResSeguimientosRepository {

    constructor(
        @InjectRepository(ResSeguimientosEntity)
        private readonly resSeguimientosRepository:
        Repository<ResSeguimientosEntity>,
    ) {}

    private MapearEntidadADominio(
        entity: ResSeguimientosEntity,
    ): ResSeguimientos {

        return new ResSeguimientos(
            entity.id,
            entity.id_alumno_proyecto,
            entity.primer_seguimiento,
            entity.segundo_seguimiento,
            entity.tercer_seguimiento,
            entity.port_antproyecto,
            entity.doc_interno,
            entity.reporte_final,
            entity.revicion_final,
            entity.acta_reciv,
            entity.acta_entreg,
        );

    }

    async ObtenerTodos(): Promise<ResSeguimientos[]> {

        const entities =
            await this.resSeguimientosRepository.find();

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResSeguimientos | null> {

        const entity =
            await this.resSeguimientosRepository.findOne({
                where: { id },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async ObtenerPorAlumnoProyecto(
        idAlumnoProyecto: number,
    ): Promise<ResSeguimientos | null> {

        const entity =
            await this.resSeguimientosRepository.findOne({
                where: {
                    id_alumno_proyecto: idAlumnoProyecto,
                },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async Crear(
        dto: CrearResSeguimientoDto,
    ): Promise<ResSeguimientos> {

        const entity =
            this.resSeguimientosRepository.create({

                id_alumno_proyecto:
                    dto.id_alumno_proyecto,

                primer_seguimiento:
                    dto.primer_seguimiento,

                segundo_seguimiento:
                    dto.segundo_seguimiento,

                tercer_seguimiento:
                    dto.tercer_seguimiento,

                port_antproyecto:
                    dto.port_antproyecto,

                doc_interno:
                    dto.doc_interno,

                reporte_final:
                    dto.reporte_final,

                revicion_final:
                    dto.revicion_final,

                acta_reciv:
                    dto.acta_reciv,

                acta_entreg:
                    dto.acta_entreg,

            });

        const entityGuardada =
            await this.resSeguimientosRepository.save(
                entity,
            );

        return this.MapearEntidadADominio(
            entityGuardada,
        );

    }

    async Actualizar(
        id: number,
        dto: ActualizarResSeguimientoDto,
    ): Promise<ResSeguimientos> {

        const entity =
            await this.resSeguimientosRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el seguimiento con id ${id}`,
            );
        }

        Object.assign(entity, {
            ...dto,
        });

        const entityActualizada =
            await this.resSeguimientosRepository.save(
                entity,
            );

        return this.MapearEntidadADominio(
            entityActualizada,
        );

    }

    async Eliminar(
        id: number,
    ): Promise<void> {

        const entity =
            await this.resSeguimientosRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el seguimiento con id ${id}`,
            );
        }

        await this.resSeguimientosRepository.delete(id);

    }

}