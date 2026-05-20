import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, } from 'typeorm';
import { ResProyectosEntity } from '../../entities/residencias_profesionales/res_proyectos';
import { ResProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';
import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';
import { CrearResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';
import { ActualizarResProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_proyectos/actualizar_res_proyecto.dto';

@Injectable()
export class ResProyectosRepository implements IResProyectosRepository {

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
            entity.id_carrera,
            entity.descripcion,
            entity.asesor_externo,
            entity.celular,
            entity.correo,
            entity.anteproyecto,
            entity.carta_aceptacion,
        );

    }

    async ObtenerTodos(): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                relations: ['empresa'],
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResProyectos | null> {

        const entity =
            await this.resProyectosRepository.findOne({
                where: { id },
                relations: ['empresa'],
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
                where: {
                    id_empresa: idEmpresa,
                },
                relations: ['empresa'],
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorCarrera(
        idCarrera: number,
    ): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                where: {
                    id_carrera: idCarrera,
                },
                relations: ['empresa'],
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorAsesorExterno(
        asesorExterno: string,
    ): Promise<ResProyectos[]> {

        const entities =
            await this.resProyectosRepository.find({
                where: {
                    asesor_externo: ILike(`%${asesorExterno}%`),
                },
                relations: ['empresa'],
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async Crear(
        dto: CrearResProyectoDto,
    ): Promise<ResProyectos> {

        const entity =
            this.resProyectosRepository.create({

                id_empresa: dto.id_empresa,
                id_carrera: dto.id_carrera,
                descripcion: dto.descripcion,
                asesor_externo: dto.asesor_externo,
                celular: dto.celular,
                correo: dto.correo,
                anteproyecto: dto.anteproyecto,
                carta_aceptacion: dto.carta_aceptacion,

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

        Object.assign(entity, {
            ...dto,
        });

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