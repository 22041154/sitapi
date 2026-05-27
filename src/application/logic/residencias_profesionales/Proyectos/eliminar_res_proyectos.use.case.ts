import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';

@Injectable()
export class EliminarResProyectosUseCase {

    constructor(
        @Inject('IResProyectosRepository')
        private readonly resProyectosRepository:
        IResProyectosRepository,
    ) {}

    async EliminarPorId(
        id: number,
    ): Promise<void> {

        const proyecto =
            await this.resProyectosRepository.ObtenerPorId(id);

        if (!proyecto) {
            throw new NotFoundException(
                `No se encontró el proyecto con id ${id}`,
            );
        }

        await this.resProyectosRepository.Eliminar(id);

    }

    async EliminarPorEmpresa(
        idEmpresa: number,
    ): Promise<void> {

        const proyectos =
            await this.resProyectosRepository.ObtenerPorEmpresa(idEmpresa);

        if (proyectos.length === 0) {
            throw new NotFoundException(
                `No se encontraron proyectos para la empresa con id ${idEmpresa}`,
            );
        }

        for (const proyecto of proyectos) {
            await this.resProyectosRepository.Eliminar(proyecto.id);
        }

    }

    async EliminarPorFolio(
        folio: string,
    ): Promise<void> {

        const proyectos =
            await this.resProyectosRepository.ObtenerPorFolio(folio);

        if (proyectos.length === 0) {
            throw new NotFoundException(
                `No se encontraron proyectos con el folio ${folio}`,
            );
        }

        for (const proyecto of proyectos) {
            await this.resProyectosRepository.Eliminar(proyecto.id);
        }

    }

}