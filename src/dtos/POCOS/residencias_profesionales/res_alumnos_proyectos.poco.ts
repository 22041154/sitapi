export class ResAlumnosProyectos {
  constructor(
    public readonly id: number,
    public readonly idAlumnoAcademico: number,
    public readonly idProyecto: number,
    public readonly nombreProyecto: string,
    public readonly asesorInterno: string,
    public readonly proyecto?: string,
    public readonly seguimiento1?: string,
    public readonly seguimiento2?: string,
    public readonly seguimiento3?: string,
    public readonly calificacion?: number,
  ) {}

}