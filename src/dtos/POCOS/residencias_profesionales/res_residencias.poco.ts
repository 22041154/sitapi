export class ResResidencias {
  constructor(
    public readonly id: number,
    public readonly idPeriodoEscolar: number,
    public readonly idAlumnoAcademico: number,
    public readonly idEmpresa: number,
    public readonly idAsesorInterno: number,
    public readonly estatusResidencia?: string,
    public readonly nombreProyecto?: string,
    public readonly nombreAsesorExterno?: string,
    public readonly calificacion?: number,
    public readonly folioActaResidencia?: string,
    public readonly observaciones?: string,
  ) {}

  get EstaActiva(): boolean {
    return this.estatusResidencia === 'A';
  }

  get EstaTerminada(): boolean {
    return this.estatusResidencia === 'T';
  }

  get EstaCancelada(): boolean {
    return this.estatusResidencia === 'C';
  }

  get EstaRechazada(): boolean {
    return this.estatusResidencia === 'R';
  }

}