import { Injectable, Inject, NotFoundException, ConflictException, } from '@nestjs/common';
import { IResCalificacionesRepository } from '../../../../domain/interfaces/residencias_profesionales/res_calificaciones.interface';

@Injectable()
export class EliminarResCalificacionesUseCase {

    constructor(
        @Inject('IResCalificacionesRepository')
        private readonly resCalificacionesRepository:
        IResCalificacionesRepository,
    ) {}

    async EliminarPorId(
        id: number,
    ): Promise<void> {

        const calificacion =
            await this.resCalificacionesRepository
                .ObtenerPorId(id);

        if (!calificacion) {
            throw new NotFoundException(
                `No se encontró la calificación con id ${id}`,
            );
        }

        if (calificacion.EstaCapturada) {
            throw new ConflictException(
                'No se puede eliminar una calificación ya capturada oficialmente',
            );
        }

        await this.resCalificacionesRepository
            .Eliminar(id);

    }

}