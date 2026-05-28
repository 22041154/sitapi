import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISsDocumentosAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_documentos_alumnos.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { SsDocumentosAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';

@Injectable()
export class ObtenerSsDocumentosAlumnos {
  constructor(
    @Inject('ISsDocumentosAlumnosRepository')
    private readonly documentosRepository: ISsDocumentosAlumnosRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  // Convierte los paths guardados en PostgreSQL a URLs temporales de descarga
  private async resolverUrls(doc: SsDocumentosAlumnosPoco): Promise<SsDocumentosAlumnosPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;

    const carta_presentacion = doc.carta_presentacion
      ? await this.storageService.getPresignedUrl(bucket, doc.carta_presentacion)
      : null;

    const carta_compromiso = doc.carta_compromiso
      ? await this.storageService.getPresignedUrl(bucket, doc.carta_compromiso)
      : null;

    const carta_aceptacion = doc.carta_aceptacion
      ? await this.storageService.getPresignedUrl(bucket, doc.carta_aceptacion)
      : null;

    const seguro_facultativo = doc.seguro_facultativo
      ? await this.storageService.getPresignedUrl(bucket, doc.seguro_facultativo)
      : null;

    return new SsDocumentosAlumnosPoco(
      doc.id,
      doc.id_alumno_academico,
      doc.id_plan_trabajo,
      carta_presentacion,
      carta_compromiso,
      carta_aceptacion,
      seguro_facultativo,
    );
  }

  async ObtenerTodos(): Promise<SsDocumentosAlumnosPoco[]> {
    const docs = await this.documentosRepository.ObtenerTodos();
    if (!docs || docs.length === 0) throw new NotFoundException('No hay documentos');
    return Promise.all(docs.map(d => this.resolverUrls(d)));
  }

  async ObtenerPorId(id: number): Promise<SsDocumentosAlumnosPoco> {
    const doc = await this.documentosRepository.ObtenerPorId(id);
    if (!doc) throw new NotFoundException('Documento no encontrado');
    return this.resolverUrls(doc);
  }

  async ObtenerPorIdAlumnoAcademico(id_alumno: number): Promise<SsDocumentosAlumnosPoco[]> {
    const docs = await this.documentosRepository.ObtenerPorIdAlumnoAcademico(id_alumno);
    if (!docs || docs.length === 0) throw new NotFoundException('No hay documentos para este alumno');
    return Promise.all(docs.map(d => this.resolverUrls(d)));
  }

  async ObtenerPorIdPlanTrabajo(id_plan_trabajo: number): Promise<SsDocumentosAlumnosPoco[]> {
    const docs = await this.documentosRepository.ObtenerPorIdPlanTrabajo(id_plan_trabajo);
    if (!docs || docs.length === 0) {
      throw new NotFoundException(`No se encontraron documentos para el plan de trabajo con id ${id_plan_trabajo}`);
    }
    return Promise.all(docs.map(d => this.resolverUrls(d)));
  }
}