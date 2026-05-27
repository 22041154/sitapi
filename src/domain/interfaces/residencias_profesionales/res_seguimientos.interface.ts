import { ResSeguimientos } from '../../../dtos/POCOS/residencias_profesionales/res_seguimientos.poco';

import { CrearResSeguimientoDto } from '../../../dtos/requests/Residencias Profesionales/res_seguimientos/crear_res_seguimientos.request';

import { ActualizarResSeguimientoDto } from '../../../dtos/requests/Residencias Profesionales/res_seguimientos/actualizar_res_siguimientos.request';

export interface IResSeguimientosRepository {

    ObtenerTodos(): Promise<ResSeguimientos[]>;

    ObtenerPorId(
        id: number,
    ): Promise<ResSeguimientos | null>;

    ObtenerPorAlumnoProyecto(
        idAlumnoProyecto: number,
    ): Promise<ResSeguimientos | null>;

    Crear(
        dto: CrearResSeguimientoDto,
    ): Promise<ResSeguimientos>;

    Actualizar(
        id: number,
        dto: ActualizarResSeguimientoDto,
    ): Promise<ResSeguimientos>;

    Eliminar(
        id: number,
    ): Promise<void>;

}