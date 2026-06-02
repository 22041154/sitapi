import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlumnoDatosAcademicosEntity } from '../bd/entities/alumnos_datos_academicos.entity';
import { AlumnosDatosPersonalesEntity } from '../bd/entities/aluumnos_datos_personales.entity';
import { CarrerasEntity } from '../bd/entities/carreras.entity';

import { SsPermisosEntity } from '../bd/entities/servicio_social/ss_permisos.entity';
import { SsRolesPermisosEntity } from '../bd/entities/servicio_social/ss_roles_permisos.entity';

import { AlumnoDatosAcademicosRepository } from '../bd/repositories/alumnos_datos_academicos.repositiry';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlumnoDatosAcademicosEntity,
      AlumnosDatosPersonalesEntity,
      CarrerasEntity,
      SsPermisosEntity,
      SsRolesPermisosEntity,
    ]),
  ],

  providers: [
    AlumnoDatosAcademicosRepository, // 🔥 IMPORTANTE (CLASE REAL)

    {
      provide: 'IAlumnoDatosAcademicosRepository',
      useClass: AlumnoDatosAcademicosRepository,
    },
  ],

  exports: [
    AlumnoDatosAcademicosRepository, // 🔥 IMPORTANTE
    'IAlumnoDatosAcademicosRepository',
  ],
})
export class AlumnoDatosAcademicosModule {}