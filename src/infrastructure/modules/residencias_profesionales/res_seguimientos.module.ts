import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ResSeguimientosEntity } from '../../bd/entities/residencias_profesionales/res_seguimientos.entity';

import { ResSeguimientosRepository } from '../../bd/repositories/residencias_profesionales/rp_seguimientos.repository';

import { ResSeguimientosController } from '../../../application/controllers/residencias_profesionales/res_seguimientos.controller';

import { CrearResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/crear_res_seguimientos.use.case';

import { ObtenerResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/obtener_res_seguimientos.use.case';

import { ActualizarResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/actualizar_res_seguimientos.use.case';

import { EliminarResSeguimientosUseCase } from '../../../application/logic/residencias_profesionales/Seguimientos/eliminar_res_seguimientos.use.case';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ResSeguimientosEntity,
        ]),
    ],

    controllers: [
        ResSeguimientosController,
    ],

    providers: [
        CrearResSeguimientosUseCase,
        ObtenerResSeguimientosUseCase,
        ActualizarResSeguimientosUseCase,
        EliminarResSeguimientosUseCase,
        {
            provide: 'IResSeguimientosRepository',
            useClass: ResSeguimientosRepository,
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