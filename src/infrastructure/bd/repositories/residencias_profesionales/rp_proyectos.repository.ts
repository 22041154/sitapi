import { Injectable, NotFoundException, } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository, } from 'typeorm';

import { ResProyectosEntity } from '../../entities/residencias_profesionales/res_proyectos';

import { ResProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';

import { CrearResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';

import { ActualizarResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/actualizar_res_proyecto.dto';

@Injectable()
export class ResProyectosRepository
implements IResProyectosRepository {

    constructor(
        @InjectRepository(ResProyectosEntity)
        private readonly resProyectosRepository:
        Repository<ResProyectosEntity>,
    ) {}

    private MapearEntidadADominio(
        entity: ResProyectosEntity,
    ): ResProyectos {

        return new ResProyectos(
            entity.id,
            entity.id_empresa,
            entity.folio,
            entity.nombre,
            entity.nombre_asesor_externo,
            entity.puesto_asesor_externo,
            entity.telefono_y_extension,
            entity.id_clave_area,
        );

    }

    async ObtenerTodos(): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find();

        return entities.map(
            (entity) =>
                this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResProyectos | null> {

        const entity =
            await this.resProyectosRepository.findOne({
                where: { id },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async ObtenerPorEmpresa(
        idEmpresa: number,
    ): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                where: { id_empresa: idEmpresa },
            });

        return entities.map(
            (entity) =>
                this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorFolio(
        folio: string,
    ): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                where: {
                    folio: ILike(`%${folio}%`),
                },
            });

        return entities.map(
            (entity) =>
                this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorNombre(
        nombre: string,
    ): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                where: {
                    nombre: ILike(`%${nombre}%`),
                },
            });

        return entities.map(
            (entity) =>
                this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorNombreAsesorExterno(
        nombreAsesorExterno: string,
    ): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                where: {
                    nombre_asesor_externo:
                        ILike(`%${nombreAsesorExterno}%`),
                },
            });

        return entities.map(
            (entity) =>
                this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorIdClaveArea(
        idClaveArea: number,
    ): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                where: {
                    id_clave_area: idClaveArea,
                },
            });

        return entities.map(
            (entity) =>
                this.MapearEntidadADominio(entity),
        );

    }

    async Crear(
        dto: CrearResProyectoDto,
    ): Promise<ResProyectos> {

        const entity =
            this.resProyectosRepository.create({

                id_empresa: dto.id_empresa,
                folio: dto.folio,
                nombre: dto.nombre,
                nombre_asesor_externo:
                    dto.nombre_asesor_externo,
                puesto_asesor_externo:
                    dto.puesto_asesor_externo,
                telefono_y_extension:
                    dto.telefono_y_extension,
                id_clave_area: dto.id_clave_area,

            });

        const entityGuardada =
            await this.resProyectosRepository.save(entity);

        return this.MapearEntidadADominio(
            entityGuardada,
        );

    }

    async Actualizar(
        id: number,
        dto: ActualizarResProyectoDto,
    ): Promise<ResProyectos> {

        const entity =
            await this.resProyectosRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el proyecto con id ${id}`,
            );
        }

        Object.assign(entity, dto);

        const entityActualizada =
            await this.resProyectosRepository.save(entity);

        return this.MapearEntidadADominio(
            entityActualizada,
        );

    }

    async Eliminar(
        id: number,
    ): Promise<void> {

        const entity =
            await this.resProyectosRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el proyecto con id ${id}`,
            );
        }

        await this.resProyectosRepository.delete(id);

    }

}