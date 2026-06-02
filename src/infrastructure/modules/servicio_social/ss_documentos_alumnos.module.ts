import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SsDocumentosAlumnosEntity } from '../../bd/entities/servicio_social/ss_documentos_alumnos.entity';
import { PeriodosEscolaresEntity } from '../../bd/entities/catalogos/periodos_escolares.entity';
import { AlumnoDatosAcademicosEntity } from '../../bd/entities/alumnos_datos_academicos.entity';

import { SsDocumentosAlumnosController } from '../../../application/controllers/servicio_social/ss_documentos_alumnos.controller';

import { ObtenerSsDocumentosAlumnos } from '../../../application/logic/servicio_Social/DocumentosAlumnos/obtener_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosUseCase } from '../../../application/logic/servicio_Social/DocumentosAlumnos/crear_ss_documentos_alumnos';
import { EliminarSsDocumentosAlumnosUseCase } from '../../../application/logic/servicio_Social/DocumentosAlumnos/eliminar_ss_documentos_alumnos';
import { ActualizarSsDocumentosAlumnosUseCase } from '../../../application/logic/servicio_Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.use.case';

import { SsDocumentosAlumnosRepository } from '../../bd/repositories/servicio_social/ss_documentos_alumnos.repository';
import { PeriodosEscolaresRepository } from '../../bd/repositories/catalogos/periodos_escolares.entity';
import { AlumnoDatosAcademicosRepository } from '../../bd/repositories/alumnos_datos_academicos.repositiry';

import { StorageModule } from '../storage.module';
import { AlumnoDatosAcademicosModule } from '../alumnos_datos_academicos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SsDocumentosAlumnosEntity,
      PeriodosEscolaresEntity,
      AlumnoDatosAcademicosEntity,
    ]),
    StorageModule,
    AlumnoDatosAcademicosModule, // 🔥 CLAVE
  ],

  controllers: [SsDocumentosAlumnosController],

  providers: [
    ObtenerSsDocumentosAlumnos,
    CrearSsDocumentosAlumnosUseCase,
    EliminarSsDocumentosAlumnosUseCase,
    ActualizarSsDocumentosAlumnosUseCase,

    PeriodosEscolaresRepository,

    {
      provide: 'ISsDocumentosAlumnosRepository',
      useClass: SsDocumentosAlumnosRepository,
    },
  ],
})
export class SsDocumentosAlumnosModule {}