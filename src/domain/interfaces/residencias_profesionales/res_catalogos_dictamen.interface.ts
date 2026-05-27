import { ResCatalogoDictamen } from '../../../dtos/POCOS/residencias_profesionales/res_catalogo_dictamen.poco';

import { CrearResCatalogoDictamenDto } from '../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/crear_res_catalogos_dictamen.request';

import { ActualizarResCatalogoDictamenDto } from '../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/actualizar_res_catalogos_dictamen.request';

export interface IResCatalogoDictamenRepository {

    ObtenerTodos(): Promise<ResCatalogoDictamen[]>;

    ObtenerPorId(
        id: number,
    ): Promise<ResCatalogoDictamen | null>;

    ObtenerPorNombre(
        nombre: string,
    ): Promise<ResCatalogoDictamen[]>;

    Crear(
        dto: CrearResCatalogoDictamenDto,
    ): Promise<ResCatalogoDictamen>;

    Actualizar(
        id: number,
        dto: ActualizarResCatalogoDictamenDto,
    ): Promise<ResCatalogoDictamen>;

    Eliminar(
        id: number,
    ): Promise<void>;

}