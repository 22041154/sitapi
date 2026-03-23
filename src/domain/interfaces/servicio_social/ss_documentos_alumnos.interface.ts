import { SsDocumentosAlumnosPoco } from '../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';
import { CrearSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';

export interface ISsDocumentosAlumnosRepository {
  ObtenerTodos(): Promise<SsDocumentosAlumnosPoco[]>;
  ObtenerPorId(id: number): Promise<SsDocumentosAlumnosPoco | null>;
  ObtenerPorIdAlumnoAcademico(id_alumno_academico: number): Promise<SsDocumentosAlumnosPoco[]>;
  ObtenerPorIdPlanTrabajo(id_plan_trabajo: number): Promise<SsDocumentosAlumnosPoco[]>;
  Crear(dto: CrearSsDocumentosAlumnosDto, archivos: any): Promise<SsDocumentosAlumnosPoco>;
  Eliminar(id: number): Promise<void>;
}