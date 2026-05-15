// res_alumnos_proyectos.response.ts

export class ResAlumnosProyectosResponse {
  id: number;
  idAlumnoAcademico: number;
  idProyecto: number;
  nombreProyecto: string;
  asesorInterno: string;
  proyecto?: string;
  seguimiento1?: string;
  seguimiento2?: string;
  seguimiento3?: string;
  calificacion?: number;
}