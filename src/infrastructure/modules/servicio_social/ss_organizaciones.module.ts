import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsOrganizacionesEntity } from '../../bd/entities/servicio_social/ss_organizaciones.entity';
import { SsOrganizacionesRepository } from '../../bd/repositories/servicio_social/ss_organizaciones.repository';
import { SsOrganizacionesController } from '../../../application/controllers/servicio_social/ss_organizaaciones.logic';
import { ObtenerSsOrganizaciones } from '../../../application/logic/servicio_Social/obtener_ss_organizaciones';

@Module({
  imports: [
    TypeOrmModule.forFeature([SsOrganizacionesEntity])
  ],

  providers: [
    ObtenerSsOrganizaciones,
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
  ],
})
export class SsOrganizacionesModule {}