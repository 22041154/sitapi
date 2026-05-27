export class ResCalificaciones {

  constructor(
    public readonly id: number,
    public readonly idAlumnoProyecto: number,
    public readonly calificacion?: number,
    public readonly fecha?: Date,
    public readonly captura?: boolean,
    public readonly folioActaResidencia?: string,
    public readonly idMateria?: number,
    public readonly idGrupo?: number,
  ) {}

  get EstaCapturada(): boolean {
    return this.captura === true;
  }

}