import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsRolesPermisosEntity } from '../../bd/entities/servicio_social/ss_roles_permisos.entity';
import { SsRolesEntity } from '../../bd/entities/servicio_social/ss_roles..entity';
import { SsPermisosEntity } from '../../bd/entities/servicio_social/ss_permisos.entity';
import { SsRolesPermisosRepository } from '../../bd/repositories/servicio_social/ss_roles_permisos.repository';
import { SsRolesPermisosController } from '../../../application/controllers/servicio_social/ss_roles_permisos.controller';
import { ObtenerSsRolesPermisosUseCase } from '../../../application/logic/servicio_Social/Roles_Permisos/obtener_ss_roles_permisos';
import { CrearSsRolPermisoUseCase } from '../../../application/logic/servicio_Social/Roles_Permisos/craer_ss_roles_permisos';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SsRolesPermisosEntity,
      SsRolesEntity,
      SsPermisosEntity,
    ])
  ],

  providers: [
    ObtenerSsRolesPermisosUseCase,
    CrearSsRolPermisoUseCase,
    {
      provide: 'ISsRolesPermisosRepository',
      useClass: SsRolesPermisosRepository,
    },
  ],

  controllers: [
    SsRolesPermisosController
  ],

  exports: [
    ObtenerSsRolesPermisosUseCase,
    CrearSsRolPermisoUseCase,
  ],
})
export class SsRolesPermisosModule {}