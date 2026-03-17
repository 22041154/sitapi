import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsOrganizacionesEntity } from '../../bd/entities/servicio_social/ss_organizaciones.entity';
import { SsOrganizacionesRepository } from '../../bd/repositories/servicio_social/ss_organizaciones.repository';
import { SsOrganizacionesController } from '../../../application/controllers/servicio_social/ss_organizaaciones.controller';
import { ObtenerSsOrganizaciones } from '../../../application/logic/servicio_Social/Organizaciones/obtener_ss_organizaciones';
import { CrearSsOrganizacionUseCase } from '../../../application/logic/servicio_Social/Organizaciones/crear_ss_organizaciones';

@Module({
  imports: [
    TypeOrmModule.forFeature([SsOrganizacionesEntity])
  ],

  providers: [
    ObtenerSsOrganizaciones,
    CrearSsOrganizacionUseCase,
    {
      provide: 'ISsOrganizacionesRepository',
      useClass: SsOrganizacionesRepository,
    },
  ],

  controllers: [
    SsOrganizacionesController
  ],

  exports: [
    ObtenerSsOrganizaciones,
    CrearSsOrganizacionUseCase,
  ],
})
export class SsOrganizacionesModule {}
