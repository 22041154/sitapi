export class ResSeguimientos {

    constructor(
        public readonly id: number,
        public readonly idAlumnoProyecto: number,
        public readonly primerSeguimiento?: string,
        public readonly segundoSeguimiento?: string,
        public readonly tercerSeguimiento?: string,
        public readonly portAntproyecto?: string,
        public readonly docInterno?: string,
        public readonly reporteFinal?: string,
        public readonly revicionFinal?: string,
        public readonly actaReciv?: string,
        public readonly actaEntreg?: string,
    ) {}

}