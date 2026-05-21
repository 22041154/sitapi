import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResAsesorIntProyectosEntity } from '../../bd/entities/residencias_profesionales/res_asesor_int_proyectos';
import { ResAsesorIntProyectosRepository } from '../../bd/repositories/residencias_profesionales/rp_asesor_int_proyecto.repository';
import { ResAsesorIntProyectosController } from '../../../application/controllers/residencias_profesionales/res_asesor_int_proyecto.controller';
import { ObtenerResAsesorIntProyectosUseCase } from '../../../application/logic/residencias_profesionales/Asesor Int Proyecto/obtener_res_asesor_int_proyecto.use.case';
import { CrearResAsesorIntProyectosUseCase } from '../../../application/logic/residencias_profesionales/Asesor Int Proyecto/crear_asesor_int_proyecto.use.case';
import { ActualizarResAsesorIntProyectosUseCase } from '../../../application/logic/residencias_profesionales/Asesor Int Proyecto/actualizar_res_asesor_int_proyecto.use.case';
import { EliminarResAsesorIntProyectosUseCase } from '../../../application/logic/residencias_profesionales/Asesor Int Proyecto/eliminar_res_asesor_int_proyecto.use.case';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ResAsesorIntProyectosEntity,
        ]),
    ],

    providers: [
        CrearResAsesorIntProyectosUseCase,
        ObtenerResAsesorIntProyectosUseCase,
        ActualizarResAsesorIntProyectosUseCase,
        EliminarResAsesorIntProyectosUseCase,
        {
            provide:
                'IResAsesorIntProyectosRepository',

            useClass:
                ResAsesorIntProyectosRepository,
        },
    ],

    controllers: [
        ResAsesorIntProyectosController,
    ],

    exports: [
        CrearResAsesorIntProyectosUseCase,
        ObtenerResAsesorIntProyectosUseCase,
        ActualizarResAsesorIntProyectosUseCase,
        EliminarResAsesorIntProyectosUseCase,
    ],
})
export class ResAsesorIntProyectosModule {}