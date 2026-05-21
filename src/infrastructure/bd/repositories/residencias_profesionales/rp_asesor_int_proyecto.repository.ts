import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { ResAsesorIntProyectosEntity } from '../../entities/residencias_profesionales/res_asesor_int_proyectos';
import { ResAsesorIntProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_asesor_int_proyecto';
import { IResAsesorIntProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_asesor_int_proyecto.interface';
import { CrearResAsesorIntProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/res_asesor_int_proyecto.dto';
import { ActualizarResAsesorIntProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/actualizar_res_asesor_int_proyecto.dto';

@Injectable()
export class ResAsesorIntProyectosRepository
    implements IResAsesorIntProyectosRepository {

    constructor(
        @InjectRepository(ResAsesorIntProyectosEntity)
        private readonly resAsesorIntProyectosRepository:
        Repository<ResAsesorIntProyectosEntity>,
    ) {}

    private MapearEntidadADominio(
        entity: ResAsesorIntProyectosEntity,
    ): ResAsesorIntProyectos {

        return new ResAsesorIntProyectos(
            entity.id,
            entity.id_proyecto,
            entity.id_personal_academico,
        );

    }

    async ObtenerTodos(): Promise<ResAsesorIntProyectos[]> {

        const entities = await this.resAsesorIntProyectosRepository.find();

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorId( id: number, ): Promise<ResAsesorIntProyectos | null> {

        const entity =
            await this.resAsesorIntProyectosRepository.findOne({
                where: { id },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async ObtenerPorProyecto(
        idProyecto: number,
    ): Promise<ResAsesorIntProyectos[]> {

        const entities =
            await this.resAsesorIntProyectosRepository.find({
                where: {
                    id_proyecto: idProyecto,
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorPersonalAcademico(
        idPersonal: number,
    ): Promise<ResAsesorIntProyectos[]> {

        const entities =
            await this.resAsesorIntProyectosRepository.find({
                where: {
                    id_personal_academico: idPersonal,
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerAsignacion(
        idProyecto: number,
        idPersonal: number,
    ): Promise<ResAsesorIntProyectos | null> {

        const entity =
            await this.resAsesorIntProyectosRepository.findOne({
                where: {
                    id_proyecto: idProyecto,
                    id_personal_academico: idPersonal,
                },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async Crear(
        dto: CrearResAsesorIntProyectoDto,
    ): Promise<ResAsesorIntProyectos> {

        const entity =
            this.resAsesorIntProyectosRepository.create({

                id_proyecto: dto.id_proyecto,
                id_personal_academico:
                    dto.id_personal_academico,

            });

        const entityGuardada =
            await this.resAsesorIntProyectosRepository.save(
                entity,
            );

        return this.MapearEntidadADominio(
            entityGuardada,
        );

    }

    async Actualizar(
        id: number,
        dto: ActualizarResAsesorIntProyectoDto,
    ): Promise<ResAsesorIntProyectos> {

        const entity =
            await this.resAsesorIntProyectosRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró la asignación con id ${id}`,
            );
        }

        Object.assign(entity, {
            ...dto,
        });

        const entityActualizada =
            await this.resAsesorIntProyectosRepository.save(
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
            await this.resAsesorIntProyectosRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró la asignación con id ${id}`,
            );
        }

        await this.resAsesorIntProyectosRepository.delete(
            id,
        );

    }

}