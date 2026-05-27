import { ResAlumnosProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_alumnos_proyectos.poco';
import { ResAlumnosProyectosResponse } from '../../../dtos/responses/residencias_profesionales/res_alumnos_proyectos.response';

export class ResAlumnosProyectosPresenter {

    static Presentar(
        poco: ResAlumnosProyectos,
    ): ResAlumnosProyectosResponse {

        const response = new ResAlumnosProyectosResponse();

        response.id = poco.id;
        response.idProyecto = poco.idProyecto;
        response.idAlumnoAcademico = poco.idAlumnoAcademico;
        response.idAsesorInterno = poco.idAsesorInterno;
        response.idCatalogoDictamen = poco.idCatalogoDictamen;
        response.idPeriodoEscolar = poco.idPeriodoEscolar;
        response.idRevisor = poco.idRevisor;

        return response;

    }

    static PresentarLista(
        pocos: ResAlumnosProyectos[],
    ): ResAlumnosProyectosResponse[] {

        return pocos.map(poco => this.Presentar(poco));

    }

}