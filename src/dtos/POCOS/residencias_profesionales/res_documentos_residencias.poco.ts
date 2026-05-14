export class ResDocumentosResidencias {
  constructor(
    public readonly id: number,
    public readonly idAlumnoAcademico: number,
    public readonly idTipoDocumento: number,
    public readonly fechaSubida: Date,
    public readonly anteproyecto?: string,
    public readonly seguro?: string,
    public readonly carta?: string,
  ) {}

}