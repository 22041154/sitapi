import { SsDocumentosAlumnosPoco } from '../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';
import { CrearSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';
import { ActualizarSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.dto';

export interface ISsDocumentosAlumnosRepository {
  ObtenerTodos(): Promise<SsDocumentosAlumnosPoco[]>;
  ObtenerPorId(id: number): Promise<SsDocumentosAlumnosPoco | null>;
  ObtenerPorIdAlumnoAcademico(id_alumno_academico: number): Promise<SsDocumentosAlumnosPoco[]>;
  ObtenerPorIdPlanTrabajo(id_plan_trabajo: number): Promise<SsDocumentosAlumnosPoco[]>;
  Crear(dto: CrearSsDocumentosAlumnosDto, paths: DocumentosPaths): Promise<SsDocumentosAlumnosPoco>;
  Eliminar(id: number): Promise<void>;
  Actualizar(
    id: number,
    dto: ActualizarSsDocumentosAlumnosDto,
    paths: Partial<DocumentosPaths>
  ): Promise<SsDocumentosAlumnosPoco>;
  ObtenerPathsPorId(id: number): Promise<DocumentosPaths | null>;
}

// Tipo auxiliar que representa los paths de los documentos
export interface DocumentosPaths {
  carta_presentacion?: string | null;
  carta_compromiso?: string | null;
  carta_aceptacion?: string | null;
  seguro_facultativo?: string | null;
}