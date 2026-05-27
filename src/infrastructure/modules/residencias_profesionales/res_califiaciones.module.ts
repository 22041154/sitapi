import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResCalificacionesEntity } from '../../bd/entities/residencias_profesionales/res_calificaciones.entity';
import { ResCalificacionesRepository } from '../../bd/repositories/residencias_profesionales/rp_calificaciones.repository';
import { ResCalificacionesController } from '../../../application/controllers/residencias_profesionales/res_calificaciones.controller';
import { CrearResCalificacionesUseCase } from '../../../application/logic/residencias_profesionales/Calificaciones/crear_res_calificaciones.use.case';
import { ObtenerResCalificacionesUseCase } from '../../../application/logic/residencias_profesionales/Calificaciones/obtener_res_calificaciones.use.case';
import { ActualizarResCalificacionesUseCase } from '../../../application/logic/residencias_profesionales/Calificaciones/actualizar_res_calificaciones.use.case';
import { EliminarResCalificacionesUseCase } from '../../../application/logic/residencias_profesionales/Calificaciones/eliminar_res_calificaciones.use.case';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ResCalificacionesEntity,
        ]),
    ],

    providers: [
        CrearResCalificacionesUseCase,
        ObtenerResCalificacionesUseCase,
        ActualizarResCalificacionesUseCase,
        EliminarResCalificacionesUseCase,
        {
            provide: 'IResCalificacionesRepository',
            useClass: ResCalificacionesRepository,
        },
    ],

    controllers: [
        ResCalificacionesController,
    ],

    exports: [
        CrearResCalificacionesUseCase,
        ObtenerResCalificacionesUseCase,
        ActualizarResCalificacionesUseCase,
        EliminarResCalificacionesUseCase,
    ],
})
export class ResCalificacionesModule {}