import { Injectable, Inject, NotFoundException, } from '@nestjs/common';
import { IResAsesorIntProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_asesor_int_proyecto.interface';

@Injectable()
export class EliminarResAsesorIntProyectosUseCase {

    constructor(
        @Inject('IResAsesorIntProyectosRepository')
        private readonly resAsesorIntProyectosRepository:
        IResAsesorIntProyectosRepository,
    ) {}

    async EliminarPorId(
        id: number,
    ): Promise<void> {

        const asignacion =
            await this.resAsesorIntProyectosRepository
                .ObtenerPorId(id);

        if (!asignacion) {
            throw new NotFoundException(
                `No se encontró la asignación con id ${id}`,
            );
        }

        await this.resAsesorIntProyectosRepository
            .Eliminar(id);

    }

}