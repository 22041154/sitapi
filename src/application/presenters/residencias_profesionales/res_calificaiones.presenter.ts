import { ResCalificaciones } from '../../../dtos/POCOS/residencias_profesionales/res_calificaciones.poco';
import { ResCalificacionesResponse } from '../../../dtos/responses/residencias_profesionales/res_calificaciones.response';

export class ResCalificacionesPresenter {

    static Presentar(
        poco: ResCalificaciones,
    ): ResCalificacionesResponse {

        const response =
            new ResCalificacionesResponse();

        response.id =
            poco.id;

        response.idAlumnoProyecto =
            poco.idAlumnoProyecto;

        response.calificacion =
            poco.calificacion;

        response.fecha =
            poco.fecha;

        response.captura =
            poco.captura;

        response.estaCapturada =
            poco.EstaCapturada;

        response.folioActaResidencia =
            poco.folioActaResidencia;

        response.idMateria =
            poco.idMateria;

        response.idGrupo =
            poco.idGrupo;

        return response;

    }

    static PresentarLista(
        pocos: ResCalificaciones[],
    ): ResCalificacionesResponse[] {

        return pocos.map(
            (poco) => this.Presentar(poco),
        );

    }

}