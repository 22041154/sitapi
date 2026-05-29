import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { ResSeguimientosEntity } from '../../bd/entities/residencias_profesionales/res_seguimientos.entity';
import { ResAlumnoProyectoEntity } from '../../bd/entities/residencias_profesionales/res_alumnos_proyectos.entity';

// Repositorios concretos
import { ResSeguimientosRepository } from '../../bd/repositories/residencias_profesionales/rp_seguimientos.repository';
import { ResAlumnosProyectosRepository } from '../../bd/repositories/residencias_profesionales/rp_alumnos_proyectos.repository';

// Controlador
import { ResSeguimientosController } from '../../../application/controllers/residencias_profesionales/res_seguimientos.controller';

// Use Cases
import { CrearResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/crear_res_seguimientos.use.case';
import { ObtenerResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/obtener_res_seguimientos.use.case';
import { ActualizarResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/actualizar_res_seguimientos.use.case';
import { EliminarResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/eliminar_res_seguimientos.use.case';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ResSeguimientosEntity,
            ResAlumnoProyectoEntity,  // ← Necesario para el repositorio de alumnos_proyectos
        ]),
    ],

    controllers: [
        ResSeguimientosController,
    ],

    providers: [
        // Use Cases
        CrearResSeguimientosUseCase,
        ObtenerResSeguimientosUseCase,
        ActualizarResSeguimientosUseCase,
        EliminarResSeguimientosUseCase,

        // Repositorios (inyectados con sus tokens)
        {
            provide: 'IResSeguimientosRepository',
            useClass: ResSeguimientosRepository,
        },
        {
            provide: 'IResAlumnosProyectosRepository',
            useClass: ResAlumnosProyectosRepository,
        },
    ],

    exports: [
        CrearResSeguimientosUseCase,
        ObtenerResSeguimientosUseCase,
        ActualizarResSeguimientosUseCase,
        EliminarResSeguimientosUseCase,
    ],
})
export class ResSeguimientosModule {}