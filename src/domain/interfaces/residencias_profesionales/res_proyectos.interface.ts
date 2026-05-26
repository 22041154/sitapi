import { ResProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_proyectos.poco';

import { CrearResProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';

import { ActualizarResProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_proyectos/actualizar_res_proyecto.dto';

export interface IResProyectosRepository {

    ObtenerTodos(): Promise<ResProyectos[]>;

    ObtenerPorId(
        id: number,
    ): Promise<ResProyectos | null>;

    ObtenerPorEmpresa(
        idEmpresa: number,
    ): Promise<ResProyectos[]>;

    ObtenerPorFolio(
        folio: string,
    ): Promise<ResProyectos[]>;

    ObtenerPorNombre(
        nombre: string,
    ): Promise<ResProyectos[]>;

    ObtenerPorNombreAsesorExterno(
        nombreAsesorExterno: string,
    ): Promise<ResProyectos[]>;

    ObtenerPorIdClaveArea(
        idClaveArea: number,
    ): Promise<ResProyectos[]>;

    Crear(
        dto: CrearResProyectoDto,
    ): Promise<ResProyectos>;

    Actualizar(
        id: number,
        dto: ActualizarResProyectoDto,
    ): Promise<ResProyectos>;

    Eliminar(
        id: number,
    ): Promise<void>;

}