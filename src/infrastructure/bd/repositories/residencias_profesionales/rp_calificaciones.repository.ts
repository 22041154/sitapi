import { Injectable, NotFoundException, ConflictException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, } from 'typeorm';
import { ResCalificacionesEntity } from '../../entities/residencias_profesionales/res_calificaciones.entity';
import { ResCalificaciones } from '../../../../dtos/POCOS/residencias_profesionales/res_calificaciones.poco';
import { IResCalificacionesRepository } from '../../../../domain/interfaces/residencias_profesionales/res_calificaciones.interface';
import { CrearResCalificacionDto } from '../../../../dtos/requests/Residencias Profesionales/res_calificaciones/crear_res_calificaciones.request';
import { ActualizarResCalificacionDto } from '../../../../dtos/requests/Residencias Profesionales/res_calificaciones/actualizar_res_calificaciones.request';

@Injectable()
export class ResCalificacionesRepository
implements IResCalificacionesRepository {

    constructor(
        @InjectRepository(ResCalificacionesEntity)
        private readonly resCalificacionesRepository:
        Repository<ResCalificacionesEntity>,
    ) {}

    private MapearEntidadADominio(
        entity: ResCalificacionesEntity,
    ): ResCalificaciones {

        return new ResCalificaciones(
            entity.id,
            entity.id_alumno_proyecto,
            entity.calificacion,
            entity.fecha,
            entity.captura,
            entity.folio_acta_residencia,
            entity.id_materia,
            entity.id_grupo,
        );

    }

    async ObtenerTodos(): Promise<ResCalificaciones[]> {

        const entities =
            await this.resCalificacionesRepository.find({
                order: {
                    fecha: 'DESC',
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResCalificaciones | null> {

        const entity =
            await this.resCalificacionesRepository.findOne({
                where: { id },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async ObtenerPorAlumnoProyecto(
        idAlumnoProyecto: number,
    ): Promise<ResCalificaciones | null> {

        const entity =
            await this.resCalificacionesRepository.findOne({
                where: {
                    id_alumno_proyecto: idAlumnoProyecto,
                },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async ObtenerPorMateria(
        idMateria: number,
    ): Promise<ResCalificaciones[]> {

        const entities =
            await this.resCalificacionesRepository.find({
                where: {
                    id_materia: idMateria,
                },
                order: {
                    calificacion: 'DESC',
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorGrupo(
        idGrupo: number,
    ): Promise<ResCalificaciones[]> {

        const entities =
            await this.resCalificacionesRepository.find({
                where: {
                    id_grupo: idGrupo,
                },
                order: {
                    calificacion: 'DESC',
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorFolioActa(
        folioActa: string,
    ): Promise<ResCalificaciones[]> {

        const entities =
            await this.resCalificacionesRepository.find({
                where: {
                    folio_acta_residencia:
                    ILike(`%${folioActa}%`),
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerCapturadas(): Promise<ResCalificaciones[]> {

        const entities =
            await this.resCalificacionesRepository.find({
                where: {
                    captura: true,
                },
                order: {
                    fecha: 'DESC',
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPendientesCaptura(): Promise<ResCalificaciones[]> {

        const entities =
            await this.resCalificacionesRepository.find({
                where: {
                    captura: false,
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async Crear(
        dto: CrearResCalificacionDto,
    ): Promise<ResCalificaciones> {

        const existeCalificacion =
            await this.resCalificacionesRepository.findOne({
                where: {
                    id_alumno_proyecto:
                    dto.id_alumno_proyecto,
                },
            });

        if (existeCalificacion) {
            throw new ConflictException(
                `Ya existe una calificación para el alumno proyecto ${dto.id_alumno_proyecto}`,
            );
        }

        const entity =
            this.resCalificacionesRepository.create({

                id_alumno_proyecto:
                dto.id_alumno_proyecto,

                calificacion:
                dto.calificacion,

                fecha:
                dto.fecha,

                captura:
                dto.captura,

                folio_acta_residencia:
                dto.folio_acta_residencia,

                id_materia:
                dto.id_materia,

                id_grupo:
                dto.id_grupo,
            });

        const entityGuardada =
            await this.resCalificacionesRepository.save(entity);

        return this.MapearEntidadADominio(
            entityGuardada,
        );

    }

    async Actualizar(
        id: number,
        dto: ActualizarResCalificacionDto,
    ): Promise<ResCalificaciones> {

        const entity =
            await this.resCalificacionesRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró la calificación con id ${id}`,
            );
        }

        if (
            entity.captura === true
            &&
            (
                dto.calificacion !== undefined
                ||
                dto.folio_acta_residencia !== undefined
                ||
                dto.id_materia !== undefined
                ||
                dto.id_grupo !== undefined
            )
        ) {
            throw new ConflictException(
                'La calificación ya fue capturada oficialmente y no puede modificarse',
            );
        }

        Object.assign(entity, {
            ...dto,
        });

        const entityActualizada =
            await this.resCalificacionesRepository.save(entity);

        return this.MapearEntidadADominio(
            entityActualizada,
        );

    }

    async Eliminar(
        id: number,
    ): Promise<void> {

        const entity =
            await this.resCalificacionesRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró la calificación con id ${id}`,
            );
        }

        await this.resCalificacionesRepository.delete(id);

    }

}