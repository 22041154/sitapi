import { Injectable, Inject, NotFoundException, } from '@nestjs/common';
import { IResProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_proyectos.interface';

@Injectable()
export class EliminarResProyectosUseCase {

    constructor(
        @Inject('IResProyectosRepository')
        private readonly resProyectosRepository: IResProyectosRepository,
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

}