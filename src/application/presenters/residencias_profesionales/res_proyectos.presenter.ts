import { ResProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';
import { ResProyectosResponse } from '../../../dtos/responses/residencias_profesionales/res_proyectos.response';

export class ResProyectosPresenter {

    static Presentar(
        poco: ResProyectos,
    ): ResProyectosResponse {

        const response = new ResProyectosResponse();

        response.id = poco.id;
        response.idEmpresa = poco.idEmpresa;
        response.idCarrera = poco.idCarrera;
        response.descripcion = poco.descripcion;
        response.asesorExterno = poco.asesorExterno;
        response.celular = poco.celular;
        response.correo = poco.correo;
        response.anteproyecto = poco.anteproyecto;
        response.cartaAceptacion = poco.cartaAceptacion;

        return response;

    }

    static PresentarLista(
        pocos: ResProyectos[],
    ): ResProyectosResponse[] {

        return pocos.map(
            poco => this.Presentar(poco),
        );

    }

}