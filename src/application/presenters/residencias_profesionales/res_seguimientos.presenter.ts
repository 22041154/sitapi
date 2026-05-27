import { ResSeguimientos } from '../../../dtos/POCOS/residencias_profesionales/res_seguimientos.poco';

import { ResSeguimientosResponse } from '../../../dtos/responses/residencias_profesionales/res_seguimientos.response';

export class ResSeguimientosPresenter {

    static Presentar(
        poco: ResSeguimientos,
    ): ResSeguimientosResponse {

        const response =
            new ResSeguimientosResponse();

        response.id = poco.id;

        response.idAlumnoProyecto =
            poco.idAlumnoProyecto;

        response.primerSeguimiento =
            poco.primerSeguimiento;

        response.segundoSeguimiento =
            poco.segundoSeguimiento;

        response.tercerSeguimiento =
            poco.tercerSeguimiento;

        response.portAntproyecto =
            poco.portAntproyecto;

        response.docInterno =
            poco.docInterno;

        response.reporteFinal =
            poco.reporteFinal;

        response.revicionFinal =
            poco.revicionFinal;

        response.actaReciv =
            poco.actaReciv;

        response.actaEntreg =
            poco.actaEntreg;

        return response;

    }

    static PresentarLista(
        pocos: ResSeguimientos[],
    ): ResSeguimientosResponse[] {

        return pocos.map(
            (poco) => this.Presentar(poco),
        );

    }

}