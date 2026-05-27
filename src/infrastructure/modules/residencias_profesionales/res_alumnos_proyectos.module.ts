import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ResAlumnoProyectoEntity } from '../../bd/entities/residencias_profesionales/res_alumnos_proyectos.entity';

import { ResAlumnosProyectosRepository } from '../../bd/repositories/residencias_profesionales/rp_alumnos_proyectos.repository';

import { ResAlumnosProyectosController } from '../../../application/controllers/residencias_profesionales/res_alumnos_proyectos.controller';

import { CrearResAlumnosProyectosUseCase } from '../../../application/logic/residencias_profesionales/Alumnos Proyectos/crear_res_alumnos_proyectos.use.case';

import { ObtenerResAlumnosProyectosUseCase } from '../../../application/logic/residencias_profesionales/Alumnos Proyectos/obtener_res_alumnos_proyectos.use.case';

import { ActualizarResAlumnosProyectosUseCase } from '../../../application/logic/residencias_profesionales/Alumnos Proyectos/actualizar_res_alumnos_proyectos.use.case';

import { EliminarResAlumnosProyectosUseCase } from '../../../application/logic/residencias_profesionales/Alumnos Proyectos/eliminar_res_alumnos_proyectos.use.case';

@Module({

    imports: [
        TypeOrmModule.forFeature([
            ResAlumnoProyectoEntity,
        ]),
    ],

    controllers: [
        ResAlumnosProyectosController,
    ],

    providers: [

        CrearResAlumnosProyectosUseCase,

        ObtenerResAlumnosProyectosUseCase,

        ActualizarResAlumnosProyectosUseCase,

        EliminarResAlumnosProyectosUseCase,

        {
            provide: 'IResAlumnosProyectosRepository',
            useClass: ResAlumnosProyectosRepository,
        },

    ],

    exports: [

        CrearResAlumnosProyectosUseCase,

        ObtenerResAlumnosProyectosUseCase,

        ActualizarResAlumnosProyectosUseCase,

        EliminarResAlumnosProyectosUseCase,

    ],

})
export class ResAlumnosProyectosModule {}