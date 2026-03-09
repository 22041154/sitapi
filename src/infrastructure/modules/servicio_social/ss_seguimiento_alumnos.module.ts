import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsSeguimientoAlumnosEntity } from '../../bd/entities/servicio_social/ss_seguimiento_alumnos.entity';
import { SsSeguimientoAlumnosController } from '../../../application/controllers/servicio_social/ss_seguimiento_alumnos.controller';
import { ObtenerSsSeguimientoAlumnos } from '../../../application/logic/servicio_Social/SeguimientoAlumnos/obtener_ss_seguimiento_alumnos';
import { SsSeguimientoAlumnosRepository } from '../../bd/repositories/servicio_social/ss_seguimiento_alumnos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SsSeguimientoAlumnosEntity])],

  controllers: [SsSeguimientoAlumnosController],

  providers: [
  ObtenerSsSeguimientoAlumnos,
  {
    provide: 'ISsSeguimientoAlumnosRepository', 
    useClass: SsSeguimientoAlumnosRepository,
  },
]

})
export class SsSeguimientoAlumnosModule {}