import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResAlumnosProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_alumnos_proyectos.interface';

@Injectable()
export class EliminarResAlumnosProyectosUseCase {

    constructor(
        @Inject('IResAlumnosProyectosRepository')
        private readonly repository: IResAlumnosProyectosRepository,
    ) {}

    async Ejecutar(id: number): Promise<void> {

        const registro =
            await this.repository.ObtenerPorId(id);

        if (!registro) {
            throw new NotFoundException(
                `No se encontró el registro con id ${id}`,
            );
        }

        await this.repository.Eliminar(id);

    }

}