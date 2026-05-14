export class ResProyectos {
  constructor(
    public readonly id: number,
    public readonly idEmpresa: number,
    public readonly idCarrera: number,
    public readonly descripcion?: string,
    public readonly asesorExterno?: string,
    public readonly celular?: string,
    public readonly correo?: string,
    public readonly anteproyecto?: string,
    public readonly cartaAceptacion?: string,
  ) {}

}