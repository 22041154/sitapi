import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsDocumentosAlumnosEntity } from '../../bd/entities/servicio_social/ss_documentos_alumnos.entity';
import { SsDocumentosAlumnosController } from '../../../application/controllers/servicio_social/ss_documentos_alumnos.controller';
import { ObtenerSsDocumentosAlumnos } from '../../../application/logic/servicio_Social/DocumentosAlumnos/obtener_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosUseCase } from '../../../application/logic/servicio_Social/DocumentosAlumnos/crear_ss_documentos_alumnos';
import { SsDocumentosAlumnosRepository } from '../../bd/repositories/servicio_social/ss_documentos_alumnos.repository';
import { EliminarSsDocumentosAlumnosUseCase } from '../../../application/logic/servicio_Social/DocumentosAlumnos/eliminar_ss_documentos_alumnos';

@Module({
  imports: [TypeOrmModule.forFeature([SsDocumentosAlumnosEntity])],
  controllers: [SsDocumentosAlumnosController],
  providers: [
    ObtenerSsDocumentosAlumnos,
    CrearSsDocumentosAlumnosUseCase,
    EliminarSsDocumentosAlumnosUseCase,
    {
      provide: 'ISsDocumentosAlumnosRepository',
      useClass: SsDocumentosAlumnosRepository,
    },
  ],
})
export class SsDocumentosAlumnosModule {}