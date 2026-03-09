import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsSeguimientoAlumnosEntity } from '../../bd/entities/servicio_social/ss_seguimiento_alumnos.entity';
import { SsSeguimientoAlumnosController } from '../../../application/controllers/servicio_social/ss_seguimiento_alumnos.controller';
import { ObtenerSsSeguimientoAlumnosUseCase } from '../../../application/logic/servicio_Social/SeguimientoAlumnos/obtener_ss_seguimiento_alumnos';
import { SsSeguimientoAlumnosRepository } from '../../bd/repositories/servicio_social/ss_seguimiento_alumnos.repository';
import { ISS_SEGUIMIENTO_ALUMNOS_REPOSITORY } from '../../../domain/interfaces/servicio_social/ss_seguimiento_alumnos.interface';

@Module({
  imports: [TypeOrmModule.forFeature([SsSeguimientoAlumnosEntity])],
  controllers: [SsSeguimientoAlumnosController],
  providers: [
    ObtenerSsSeguimientoAlumnosUseCase,
    {
      provide: ISS_SEGUIMIENTO_ALUMNOS_REPOSITORY,
      useClass: SsSeguimientoAlumnosRepository,
    },
  ],
})
export class SsSeguimientoAlumnosModule {}