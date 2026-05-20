import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResProyectosEntity } from '../../bd/entities/residencias_profesionales/res_proyectos';
import { ResProyectosRepository } from '../../bd/repositories/residencias_profesionales/rp_proyectos.repository';
import { ResProyectosController } from '../../../application/controllers/residencias_profesionales/res_proyectos.controller';
import { ObtenerResProyectosUseCase } from '../../../application/logic/residencias_profesionales/Proyectos/obtener_res_proyectos.use.case';
import { CrearResProyectosUseCase } from '../../../application/logic/residencias_profesionales/Proyectos/crear_res_proyectos.use.case';
import { EliminarResProyectosUseCase } from '../../../application/logic/residencias_profesionales/Proyectos/eliminar_res_proyectos.use.case';
import { ActualizarResProyectosUseCase } from '../../../application/logic/residencias_profesionales/Proyectos/actualizar_res_empresas.use.case';

@Module({
    imports: [
        TypeOrmModule.forFeature([ResProyectosEntity])
    ],

    providers: [
        CrearResProyectosUseCase,
        ObtenerResProyectosUseCase,
        EliminarResProyectosUseCase,
        ActualizarResProyectosUseCase,
        {
            provide: 'IResProyectosRepository',
            useClass: ResProyectosRepository,
        },
    ],

    controllers: [
        ResProyectosController
    ],

    exports: [
        ObtenerResProyectosUseCase,
        CrearResProyectosUseCase,
        EliminarResProyectosUseCase,
        ActualizarResProyectosUseCase,
    ],
})
export class ResProyectosModule {}