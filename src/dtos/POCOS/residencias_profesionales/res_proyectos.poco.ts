export class ResProyectos {

    constructor(
        public readonly id: number,
        public readonly idEmpresa: number,
        public readonly folio: string,
        public readonly nombre: string,
        public readonly nombreAsesorExterno: string,
        public readonly puestoAsesorExterno: string,
        public readonly telefonoYExtension: string,
        public readonly idClaveArea: number,
    ) {}

}