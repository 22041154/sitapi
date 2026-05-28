import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ISsDocumentosAlumnosRepository,
  DocumentosPaths,
} from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { SsDocumentosAlumnosEntity } from '../../entities/servicio_social/ss_documentos_alumnos.entity';
import { SsDocumentosAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';
import { CrearSsDocumentosAlumnosDto } from '../../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';
import { ActualizarSsDocumentosAlumnosDto } from '../../../../dtos/requests/Servicio Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.dto';

@Injectable()
export class SsDocumentosAlumnosRepository implements ISsDocumentosAlumnosRepository {
  constructor(
    @InjectRepository(SsDocumentosAlumnosEntity)
    private readonly documentosRepository: Repository<SsDocumentosAlumnosEntity>,
  ) {}

  // ─── MAPPER ──────────────────────────────────────────────────────────────
  private mapToPoco(entidad: SsDocumentosAlumnosEntity): SsDocumentosAlumnosPoco {
    return new SsDocumentosAlumnosPoco(
      Number(entidad.id),
      Number(entidad.id_alumno_academico),
      Number(entidad.id_plan_trabajo),
      entidad.carta_presentacion,
      entidad.carta_compromiso,
      entidad.carta_aceptacion,
      entidad.seguro_facultativo,
    );
  }

  // ─── QUERIES ─────────────────────────────────────────────────────────────
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

  async ObtenerPorIdPlanTrabajo(id_plan_trabajo: number): Promise<SsDocumentosAlumnosPoco[]> {
    const entidades = await this.documentosRepository.find({ where: { id_plan_trabajo } });
    return entidades.map(e => this.mapToPoco(e));
  }

  // ─── Obtiene solo los paths (usado por la logic para ir a Garage) ────────
  async ObtenerPathsPorId(id: number): Promise<DocumentosPaths | null> {
    const entidad = await this.documentosRepository.findOne({ where: { id } });
    if (!entidad) return null;

    return {
      carta_presentacion: entidad.carta_presentacion,
      carta_compromiso:   entidad.carta_compromiso,
      carta_aceptacion:   entidad.carta_aceptacion,
      seguro_facultativo: entidad.seguro_facultativo,
    };
  }

  // ─── COMMANDS ────────────────────────────────────────────────────────────
  async Crear(
    dto: CrearSsDocumentosAlumnosDto,
    paths: DocumentosPaths,
  ): Promise<SsDocumentosAlumnosPoco> {
    const entity = this.documentosRepository.create({
      id_alumno_academico: Number(dto.id_alumno_academico),
      id_plan_trabajo:     Number(dto.id_plan_trabajo),
      carta_presentacion:  paths.carta_presentacion  ?? null,
      carta_compromiso:    paths.carta_compromiso    ?? null,
      carta_aceptacion:    paths.carta_aceptacion    ?? null,
      seguro_facultativo:  paths.seguro_facultativo  ?? null,
    });

    const entityGuardada = await this.documentosRepository.save(entity);
    return this.mapToPoco(entityGuardada);
  }

  async Eliminar(id: number): Promise<void> {
    await this.documentosRepository.delete(id);
  }

  async Actualizar(
    id: number,
    dto: ActualizarSsDocumentosAlumnosDto,
    paths: Partial<DocumentosPaths>,
  ): Promise<SsDocumentosAlumnosPoco> {
    const entity = await this.documentosRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`No se encontró el registro de documentos con id ${id}`);
    }

    if (dto.id_alumno_academico !== undefined) {
      entity.id_alumno_academico = Number(dto.id_alumno_academico);
    }
    if (dto.id_plan_trabajo !== undefined) {
      entity.id_plan_trabajo = Number(dto.id_plan_trabajo);
    }

    // Solo actualiza el path si llegó un archivo nuevo para ese documento
    if (paths.carta_presentacion !== undefined) {
      entity.carta_presentacion = paths.carta_presentacion;
    }
    if (paths.carta_compromiso !== undefined) {
      entity.carta_compromiso = paths.carta_compromiso;
    }
    if (paths.carta_aceptacion !== undefined) {
      entity.carta_aceptacion = paths.carta_aceptacion;
    }
    if (paths.seguro_facultativo !== undefined) {
      entity.seguro_facultativo = paths.seguro_facultativo;
    }

    const entityActualizada = await this.documentosRepository.save(entity);
    return this.mapToPoco(entityActualizada);
  }
}