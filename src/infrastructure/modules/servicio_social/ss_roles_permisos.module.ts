import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsPermisosEntity } from '../../bd/entities/servicio_social/ss_permisos.entity';
import { SsPermisosRepository } from '../../bd/repositories/servicio_social/ss_permisos.repository';
import { SsPermisosController } from '../../../application/controllers/servicio_social/ss_permisos.controller';
import { ObtenerSsPermisos } from '../../../application/logic/servicio_Social/Permisos/obtener_ss_permisos';

@Module({
  imports: [
    TypeOrmModule.forFeature([SsPermisosEntity])
  ],

  providers: [
    ObtenerSsPermisos,
    {
      provide: 'ISsPermisosRepository',
      useClass: SsPermisosRepository,
    },
  ],

  controllers: [
    SsPermisosController
  ],

  exports: [
    ObtenerSsPermisos,
  ],
})
export class SsRolesPermisosModule {}