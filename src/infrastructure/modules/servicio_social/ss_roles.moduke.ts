import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsRolesEntity } from '../../bd/entities/servicio_social/ss_roles..entity';
import { SsRolesRepository } from '../../bd/repositories/servicio_social/ss_roles.repository';
import { SsRolesController } from '../../../application/controllers/servicio_social/ss_roles.controller';
import { ObtenerSsRoles } from '../../../application/logic/servicio_Social/Roles/obtener_ss_roles';
import { CrearSsRolesUseCase } from '../../../application/logic/servicio_Social/Roles/crear_ss_roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([SsRolesEntity])
  ],

  providers: [
    ObtenerSsRoles,
    CrearSsRolesUseCase,
    {
      provide: 'ISsRolesRepository',
      useClass: SsRolesRepository,
    },
  ],

  controllers: [
    SsRolesController
  ],

  exports: [
    ObtenerSsRoles,
  ],
})
export class SsRolesModule {}