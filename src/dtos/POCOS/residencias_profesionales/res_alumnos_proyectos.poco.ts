export class ResAlumnosProyectos {

    constructor(
        public readonly id: number,
        public readonly idProyecto: number,
        public readonly idAlumnoAcademico: number,
        public readonly idAsesorInterno: number,
        public readonly idCatalogoDictamen: number,
        public readonly idPeriodoEscolar: number,
        public readonly idRevisor: number,
    ) {}

}