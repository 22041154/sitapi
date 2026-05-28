export class SsDocumentosAlumnosPoco {
  constructor(
    public readonly id: number,
    public readonly id_alumno_academico: number,
    public readonly id_plan_trabajo: number,
    public readonly carta_presentacion?: string | null,
    public readonly carta_compromiso?: string | null,
    public readonly carta_aceptacion?: string | null,
    public readonly seguro_facultativo?: string | null,
  ) {}
}