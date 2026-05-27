import { ResProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

import { ResProyectosResponse } from '../../../dtos/responses/residencias_profesionales/res_proyectos.response';

export class ResProyectosPresenter {

    static Presentar(
        poco: ResProyectos,
    ): ResProyectosResponse {

        const response =
            new ResProyectosResponse();

        response.id = poco.id;
        response.idEmpresa = poco.idEmpresa;
        response.folio = poco.folio;
        response.nombre = poco.nombre;
        response.nombreAsesorExterno = poco.nombreAsesorExterno;
        response.puestoAsesorExterno = poco.puestoAsesorExterno;
        response.telefonoYExtension = poco.telefonoYExtension;
        response.idClaveArea = poco.idClaveArea;

        return response;

    }

    static PresentarLista(
        pocos: ResProyectos[],
    ): ResProyectosResponse[] {

        return pocos.map(
            (poco) => this.Presentar(poco),
        );

    }

}