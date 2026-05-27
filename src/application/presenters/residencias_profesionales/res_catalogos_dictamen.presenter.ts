import { ResCatalogoDictamen } from '../../../dtos/POCOS/residencias_profesionales/res_catalogo_dictamen.poco';

import { ResCatalogoDictamenResponse } from '../../../dtos/responses/residencias_profesionales/res_catalogo_dictamne.response';

export class ResCatalogoDictamenPresenter {

    static Presentar(
        poco: ResCatalogoDictamen,
    ): ResCatalogoDictamenResponse {

        const response =
            new ResCatalogoDictamenResponse();

        response.id = poco.id;
        response.nombre = poco.nombre;

        return response;

    }

    static PresentarLista(
        pocos: ResCatalogoDictamen[],
    ): ResCatalogoDictamenResponse[] {

        return pocos.map(
            (poco) => this.Presentar(poco),
        );

    }

}