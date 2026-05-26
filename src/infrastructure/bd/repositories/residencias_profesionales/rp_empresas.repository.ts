import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, } from 'typeorm';
import { ResEmpresasEntity } from '../../entities/residencias_profesionales/res_empresas';
import { ResEmpresas } from '../../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';
import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';
import { CrearResEmpresaDto } from '../../../../dtos/requests/Residencias Profesionales/res_empresas/crear_res_empresas.dto';
import { ActualizarResEmpresaDto } from '../../../../dtos/requests/Residencias Profesionales/res_empresas/actualizar_res_empresas.dto';

@Injectable()
export class ResEmpresasRepository implements IResEmpresasRepository {

    constructor(
        @InjectRepository(ResEmpresasEntity)
        private readonly resEmpresasRepository:
        Repository<ResEmpresasEntity>,
    ) {}

    private MapearEntidadADominio(
        entity: ResEmpresasEntity,
    ): ResEmpresas {

        return new ResEmpresas(
            entity.id,
            entity.nombre,
            entity.localizacion,
        );

    }

    async ObtenerTodos(): Promise<ResEmpresas[]> {

        const entities =
            await this.resEmpresasRepository.find();

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResEmpresas | null> {

        const entity =
            await this.resEmpresasRepository.findOne({
                where: { id },
            });

        return entity
            ? this.MapearEntidadADominio(entity)
            : null;

    }

    async ObtenerPorNombre(
        nombre: string,
    ): Promise<ResEmpresas[]> {

        const entities =
            await this.resEmpresasRepository.find({
                where: {
                    nombre: ILike(`%${nombre}%`),
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async ObtenerPorLocalizacion(
        localizacion: string,
    ): Promise<ResEmpresas[]> {

        const entities =
            await this.resEmpresasRepository.find({
                where: {
                    localizacion: ILike(`%${localizacion}%`),
                },
            });

        return entities.map(
            (entity) => this.MapearEntidadADominio(entity),
        );

    }

    async Crear(
        dto: CrearResEmpresaDto,
    ): Promise<ResEmpresas> {

        const entity =
            this.resEmpresasRepository.create({
                nombre: dto.nombre,
                localizacion: dto.localizacion,
            });

        const entityGuardada =
            await this.resEmpresasRepository.save(entity);

        return this.MapearEntidadADominio(
            entityGuardada,
        );

    }

    async Actualizar(
        id: number,
        dto: ActualizarResEmpresaDto,
    ): Promise<ResEmpresas> {

        const entity =
            await this.resEmpresasRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró la empresa con id ${id}`,
            );
        }

        Object.assign(entity, {
            ...dto,
        });

        const entityActualizada =
            await this.resEmpresasRepository.save(entity);

        return this.MapearEntidadADominio(
            entityActualizada,
        );

    }

    async Eliminar(
        id: number,
    ): Promise<void> {

        const entity =
            await this.resEmpresasRepository.findOne({
                where: { id },
            });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró la empresa con id ${id}`,
            );
        }

        await this.resEmpresasRepository.delete(id);

    }

    async EliminarPorNombre(
        nombre: string,
    ): Promise<void> {

        const entities =
            await this.resEmpresasRepository.find({
                where: {
                    nombre: ILike(`%${nombre}%`),
                },
            });

        if (entities.length === 0) {
            throw new NotFoundException(
                `No se encontró ninguna empresa con el nombre ${nombre}`,
            );
        }

        await this.resEmpresasRepository.delete(
            entities.map(
                (entity) => entity.id,
            ),
        );

    }

}