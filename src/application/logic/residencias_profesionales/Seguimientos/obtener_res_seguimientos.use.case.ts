import {
    Injectable,
    Inject,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';

import { IResSeguimientosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_seguimientos.interface';
import { IResAlumnosProyectosRepository } from '../../../../domain/interfaces/residencias_profesionales/res_alumnos_proyectos.interface';
import { ResSeguimientos } from '../../../../dtos/POCOS/residencias_profesionales/res_seguimientos.poco';

@Injectable()
export class ObtenerResSeguimientosUseCase {

    constructor(
        @Inject('IResSeguimientosRepository')
        private readonly resSeguimientosRepository: IResSeguimientosRepository,

        @Inject('IResAlumnosProyectosRepository') // <-- Agregar esta inyección
        private readonly resAlumnosProyectosRepository: IResAlumnosProyectosRepository,
    ) {}

    async ObtenerTodos(): Promise<ResSeguimientos[]> {
        const seguimientos = await this.resSeguimientosRepository.ObtenerTodos();

        if (!seguimientos || seguimientos.length === 0) {
            throw new NotFoundException('No se encontraron seguimientos');
        }

        return seguimientos;
    }

    async ObtenerPorId(id: number): Promise<ResSeguimientos> {
        const seguimiento = await this.resSeguimientosRepository.ObtenerPorId(id);

        if (!seguimiento) {
            throw new NotFoundException(`No se encontró el seguimiento con id ${id}`);
        }

        return seguimiento;
    }

    async ObtenerPorAlumnoProyecto(
        idAlumnoProyecto: number,
        usuario?: { id: number; rol: string; idAlumnoAcademico?: number },
    ): Promise<ResSeguimientos> {
        
        // 1. Obtener el seguimiento
        const seguimiento = await this.resSeguimientosRepository
            .ObtenerPorAlumnoProyecto(idAlumnoProyecto);

        if (!seguimiento) {
            throw new NotFoundException(
                `No se encontró seguimiento para el alumno proyecto con id ${idAlumnoProyecto}`,
            );
        }

        // 2. Validar permisos si es ALUMNO
        if (usuario && usuario.rol === 'ALUMNO') {
            const pertenece = await this.resAlumnosProyectosRepository
                .VerificarPertenencia(idAlumnoProyecto, usuario.idAlumnoAcademico!);
            
            if (!pertenece) {
                throw new ForbiddenException(
                    'No tienes permiso para ver este seguimiento',
                );
            }
        }

        return seguimiento;
    }
}