import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResAlumnoProyectoEntity } from '../../entities/residencias_profesionales/res_alumnos_proyectos.entity';

import { IResAlumnosProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_alumnos_proyectos.interface';

import { ResAlumnosProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_alumnos_proyectos.poco';

import { CrearResAlumnoProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/crear_res_alumnos_proyectos.request';

import { ActualizarResAlumnoProyectoDto } from '../../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/actualizar_res_alumnos_proyectos.request';

@Injectable()
export class ResAlumnosProyectosRepository
    implements IResAlumnosProyectosRepository {

    constructor(
        @InjectRepository(ResAlumnoProyectoEntity)
        private readonly repository: Repository<ResAlumnoProyectoEntity>,
    ) {}

    private Mapear(entity: ResAlumnoProyectoEntity): ResAlumnosProyectos {

        return new ResAlumnosProyectos(
            entity.id,
            entity.id_proyecto,
            entity.id_alumno_academico,
            entity.id_asesor_interno,
            entity.id_catalogo_dictamen,
            entity.id_periodo_escolar,
            entity.id_revisor,
        );

    }

    async ObtenerTodos(): Promise<ResAlumnosProyectos[]> {

        const entities = await this.repository.find();

        return entities.map(e => this.Mapear(e));

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResAlumnosProyectos | null> {

        const entity = await this.repository.findOne({
            where: { id },
        });

        return entity ? this.Mapear(entity) : null;

    }

    async ObtenerPorProyecto(
        idProyecto: number,
    ): Promise<ResAlumnosProyectos[]> {

        const entities = await this.repository.find({
            where: { id_proyecto: idProyecto },
        });

        return entities.map(e => this.Mapear(e));

    }

    async ObtenerPorAlumno(
        idAlumnoAcademico: number,
    ): Promise<ResAlumnosProyectos[]> {

        const entities = await this.repository.find({
            where: { id_alumno_academico: idAlumnoAcademico },
        });

        return entities.map(e => this.Mapear(e));

    }

    async ObtenerPorAsesorInterno(
        idAsesorInterno: number,
    ): Promise<ResAlumnosProyectos[]> {

        const entities = await this.repository.find({
            where: { id_asesor_interno: idAsesorInterno },
        });

        return entities.map(e => this.Mapear(e));

    }

    async ObtenerPorDictamen(
        idCatalogoDictamen: number,
    ): Promise<ResAlumnosProyectos[]> {

        const entities = await this.repository.find({
            where: { id_catalogo_dictamen: idCatalogoDictamen },
        });

        return entities.map(e => this.Mapear(e));

    }

    async Crear(
        dto: CrearResAlumnoProyectoDto,
    ): Promise<ResAlumnosProyectos> {

        const entity = this.repository.create({
            id_proyecto: dto.id_proyecto,
            id_alumno_academico: dto.id_alumno_academico,
            id_asesor_interno: dto.id_asesor_interno,
            id_catalogo_dictamen: dto.id_catalogo_dictamen,
            id_periodo_escolar: dto.id_periodo_escolar,
            id_revisor: dto.id_revisor,
        });

        const saved = await this.repository.save(entity);

        return this.Mapear(saved);

    }

    async Actualizar(
        id: number,
        dto: ActualizarResAlumnoProyectoDto,
    ): Promise<ResAlumnosProyectos> {

        const entity = await this.repository.findOne({
            where: { id },
        });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el registro con id ${id}`,
            );
        }

        Object.assign(entity, dto);

        const updated = await this.repository.save(entity);

        return this.Mapear(updated);

    }

    async Eliminar(id: number): Promise<void> {

        const entity = await this.repository.findOne({
            where: { id },
        });

        if (!entity) {
            throw new NotFoundException(
                `No se encontró el registro con id ${id}`,
            );
        }

        await this.repository.delete(id);

    }

    async VerificarPertenencia(
        idAlumnoProyecto: number,
        idAlumnoAcademico: number,
        ): Promise<boolean> {

            const count = await this.repository.count({
                where: {
                    id: idAlumnoProyecto,
                    id_alumno_academico: idAlumnoAcademico,
                },
            });

            return count > 0;

    }

}