import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
    ILike,
    Repository,
} from 'typeorm';

import { ResCatalogoDictamenEntity } from '../../entities/residencias_profesionales/res_catalogo_dictamen.entity';

import { ResCatalogoDictamen } from '../../../../dtos/POCOS/residencias_profesionales/res_catalogo_dictamen.poco';

import { IResCatalogoDictamenRepository } from '../../../../domain/interfaces/residencias_profesionales/res_catalogos_dictamen.interface';

import { CrearResCatalogoDictamenDto } from '../../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/crear_res_catalogos_dictamen.request';

import { ActualizarResCatalogoDictamenDto } from '../../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/actualizar_res_catalogos_dictamen.request';

@Injectable()
export class ResCatalogoDictamenRepository
implements IResCatalogoDictamenRepository {

    constructor(
        @InjectRepository(ResCatalogoDictamenEntity)
        private readonly resCatalogoDictamenRepository:
        Repository<ResCatalogoDictamenEntity>,
    ) {}

    private MapearEntidadADominio(
        entity: ResCatalogoDictamenEntity,
    ): ResCatalogoDictamen {

        return new ResCatalogoDictamen(
            entity.id,
            entity.nombre,
        );

    }

    async ObtenerTodos(): Promise<ResCatalogoDictamen[]> {

        const entities =
            await this.resCatalogoDictamenRepository.find({
                order: {
                    nombre: 'ASC',
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResCatalogoDictamen | null> {

        const entity =
            await this.resCatalogoDictamenRepository.findOne({
                where: { id },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async ObtenerPorNombre(
        nombre: string,
    ): Promise<ResCatalogoDictamen[]> {

        const entities =
            await this.resCatalogoDictamenRepository.find({
                where: {
                    nombre: ILike(`%${nombre}%`),
                },
                order: {
                    nombre: 'ASC',
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async Crear(
        dto: CrearResCatalogoDictamenDto,
    ): Promise<ResCatalogoDictamen> {

        const entity =
            this.resCatalogoDictamenRepository.create({
                nombre: dto.nombre,
            });

        const entityGuardada =
            await this.resCatalogoDictamenRepository.save(entity);

        return this.MapearEntidadADominio(
            entityGuardada,
        );

    }

    async Actualizar(
        id: number,
        dto: ActualizarResCatalogoDictamenDto,
    ): Promise<ResCatalogoDictamen> {

        const entity =
            await this.resCatalogoDictamenRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el dictamen con id ${id}`,
            );
        }

        Object.assign(entity, dto);

        const entityActualizada =
            await this.resCatalogoDictamenRepository.save(entity);

        return this.MapearEntidadADominio(
            entityActualizada,
        );

    }

    async Eliminar(
        id: number,
    ): Promise<void> {

        const entity =
            await this.resCatalogoDictamenRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el dictamen con id ${id}`,
            );
        }

        await this.resCatalogoDictamenRepository.delete(id);

    }

}