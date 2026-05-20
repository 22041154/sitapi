import { Injectable, Inject, NotFoundException, } from '@nestjs/common';
import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';
import { ResProyectos } from '../../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

@Injectable()
export class ObtenerResProyectosUseCase {

    constructor(
        @Inject('IResProyectosRepository')
        private readonly resProyectosRepository: IResProyectosRepository,
    ) {}

    async ObtenerTodos(): Promise<ResProyectos[]> {

        const proyectos =
            await this.resProyectosRepository.ObtenerTodos();

        if (!proyectos || proyectos.length === 0) {
            throw new NotFoundException(
                'No se encontraron proyectos de residencia',
            );
        }

        return proyectos;

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResProyectos> {

        const proyecto =
            await this.resProyectosRepository.ObtenerPorId(id);

        if (!proyecto) {
            throw new NotFoundException(
                `No se encontró el proyecto con id ${id}`,
            );
        }

        return proyecto;

    }

    async ObtenerPorEmpresa(
        idEmpresa: number,
    ): Promise<ResProyectos[]> {

        const proyectos =
            await this.resProyectosRepository.ObtenerPorEmpresa(
                idEmpresa,
            );

        if (!proyectos || proyectos.length === 0) {
            throw new NotFoundException(
                `No se encontraron proyectos para la empresa con id ${idEmpresa}`,
            );
        }

        return proyectos;

    }

    async ObtenerPorCarrera(
        idCarrera: number,
    ): Promise<ResProyectos[]> {

        const proyectos =
            await this.resProyectosRepository.ObtenerPorCarrera(
                idCarrera,
            );

        if (!proyectos || proyectos.length === 0) {
            throw new NotFoundException(
                `No se encontraron proyectos para la carrera con id ${idCarrera}`,
            );
        }

        return proyectos;

    }

    async ObtenerPorAsesorExterno(
        asesorExterno: string,
    ): Promise<ResProyectos[]> {

        const proyectos =
            await this.resProyectosRepository.ObtenerPorAsesorExterno(
                asesorExterno,
            );

        if (!proyectos || proyectos.length === 0) {
            throw new NotFoundException(
                `No se encontraron proyectos para el asesor ${asesorExterno}`,
            );
        }

        return proyectos;

    }

}