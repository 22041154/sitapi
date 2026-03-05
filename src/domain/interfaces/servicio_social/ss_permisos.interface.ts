import { SsPermisos } from "../../../dtos/POCOS/servicio_social/ss_permisos.poco";

export interface ISsPermisosRepository {

  ObtenerTodos(): Promise<SsPermisos[]>;

  ObtenerPorId(id: number): Promise<SsPermisos | null>;

  ObtenerPorNombrePermiso(permiso: string): Promise<SsPermisos[]>;

}