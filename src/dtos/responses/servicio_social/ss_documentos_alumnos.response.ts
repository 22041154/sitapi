export class SsDocumentosAlumnosResponse {
  id: number;
  id_alumno_academico: number;
  id_plan_trabajo: number;
  carta_presentacion?: string | null;   // presigned URL
  carta_compromiso?: string | null;     // presigned URL
  carta_aceptacion?: string | null;     // presigned URL
  seguro_facultativo?: string | null;   // presigned URL
}