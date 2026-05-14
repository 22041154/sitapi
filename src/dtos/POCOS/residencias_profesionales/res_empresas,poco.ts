export class ResEmpresas {
  constructor(
    public readonly id: number,
    public readonly nombreEmpresa: string,
    public readonly responsable: string,
    public readonly telefono?: string,
    public readonly correo?: string,
    public readonly localizacion?: string,
  ) {}

}