import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsProgramasEntity } from '../../bd/entities/servicio_social/ss_programas.entity';
import { SsOrganizacionesEntity } from '../../bd/entities/servicio_social/ss_organizaciones.entity';
import { SsTiposProgramasEntity } from '../../bd/entities/servicio_social/ss_tipos_programas.entity';
import { SsProgramasRepository } from '../../bd/repositories/servicio_social/ss_programas.repository';
import { SsProgramasController } from '../../../application/controllers/servicio_social/ss_programas.controller';
import { ObtenerSsProgramas } from '../../../application/logic/servicio_Social/Programas/obtemer_ss_programas';
import { CrearSsProgramaUseCase } from '../../../application/logic/servicio_Social/Programas/crear_ss_programas';
import {EliminarSsProgramasUseCase} from '../../../application/logic/servicio_Social/Programas/eliminar_ss_programas';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SsProgramasEntity,
      SsOrganizacionesEntity,
      SsTiposProgramasEntity,
    ])
  ],

  providers: [
    ObtenerSsProgramas,
    CrearSsProgramaUseCase,
    EliminarSsProgramasUseCase,

    {
      provide: 'ISsProgramasRepository',
      useClass: SsProgramasRepository,
    },
  ],

  controllers: [
    SsProgramasController
  ],

  exports: [
    ObtenerSsProgramas,
    CrearSsProgramaUseCase,
    EliminarSsProgramasUseCase,
  ],
})
export class SsProgramasModule {}