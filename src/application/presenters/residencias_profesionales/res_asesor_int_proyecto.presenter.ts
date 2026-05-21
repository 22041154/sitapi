import { ResAsesorIntProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_asesor_int_proyecto';
import { ResAsesorIntProyectosResponse } from '../../../dtos/responses/residencias_profesionales/res_asesor_int_proyectos.respionse';

export class ResAsesorIntProyectosPresenter {

    static Presentar(
        poco: ResAsesorIntProyectos,
    ): ResAsesorIntProyectosResponse {

        const response =
            new ResAsesorIntProyectosResponse();

        response.id = poco.id;
        response.idProyecto = poco.idProyecto;
        response.idPersonalAcademico = poco.idPersonalAcademico;

        return response;

    }

    static PresentarLista(
        pocos: ResAsesorIntProyectos[],
    ): ResAsesorIntProyectosResponse[] {

        return pocos.map(
            poco => this.Presentar(poco),
        );

    }

}