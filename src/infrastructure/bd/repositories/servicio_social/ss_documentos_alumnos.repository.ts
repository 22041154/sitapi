import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISsDocumentosAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { SsDocumentosAlumnosEntity } from '../../entities/servicio_social/ss_documentos_alumnos.entity';
import { SsDocumentosAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';
import { CrearSsDocumentosAlumnosDto } from '../../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';

@Injectable()
export class SsDocumentosAlumnosRepository implements ISsDocumentosAlumnosRepository {
  constructor(
    @InjectRepository(SsDocumentosAlumnosEntity)
    private readonly documentosRepository: Repository<SsDocumentosAlumnosEntity>,
  ) {}

  private mapToPoco(entidad: SsDocumentosAlumnosEntity): SsDocumentosAlumnosPoco {
    const poco = new SsDocumentosAlumnosPoco(
      Number(entidad.id),
      Number(entidad.id_alumno_academico),
      Number(entidad.id_plan_trabajo),
      entidad.carta_presentacion,
      entidad.carta_compromiso,
      entidad.carta_aceptacion,
      entidad.seguro_facultativo
    );
    return poco;
  }

  async ObtenerTodos(): Promise<SsDocumentosAlumnosPoco[]> {
    const entidades = await this.documentosRepository.find();
    return entidades.map(e => this.mapToPoco(e));
  }

  async ObtenerPorId(id: number): Promise<SsDocumentosAlumnosPoco | null> {
    const entidad = await this.documentosRepository.findOne({ where: { id } });
    return entidad ? this.mapToPoco(entidad) : null;
  }

  async ObtenerPorIdAlumnoAcademico(id_alumno_academico: number): Promise<SsDocumentosAlumnosPoco[]> {
    const entidades = await this.documentosRepository.find({ where: { id_alumno_academico } });
    return entidades.map(e => this.mapToPoco(e));
  }

  async Crear(dto: CrearSsDocumentosAlumnosDto, archivos: any): Promise<SsDocumentosAlumnosPoco> {
    const entity = this.documentosRepository.create({
      id_alumno_academico: Number(dto.id_alumno_academico),
      id_plan_trabajo: Number(dto.id_plan_trabajo),
      carta_presentacion: archivos?.carta_presentacion ? archivos.carta_presentacion[0].buffer : null,
      carta_compromiso: archivos?.carta_compromiso ? archivos.carta_compromiso[0].buffer : null,
      carta_aceptacion: archivos?.carta_aceptacion ? archivos.carta_aceptacion[0].buffer : null,
      seguro_facultativo: archivos?.seguro_facultativo ? archivos.seguro_facultativo[0].buffer : null,
    });
    
    const entityGuardada = await this.documentosRepository.save(entity);
    return this.mapToPoco(entityGuardada);
  }
}