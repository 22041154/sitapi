import { SsPermisos } from "../../../dtos/POCOS/servicio_social/ss_permisos.poco";
import { CrearSsPermisosDto } from "../../../dtos/requests/Servicio Social/Permisos/crear_ss_permisos.dto";

export interface ISsPermisosRepository {

  ObtenerTodos(): Promise<SsPermisos[]>;

  ObtenerPorId(id: number): Promise<SsPermisos | null>;

  ObtenerPorNombrePermiso(permiso: string): Promise<SsPermisos[]>;
  
  Crear(dto: CrearSsPermisosDto): Promise<SsPermisos>;
  
  Eliminar(id: number): Promise<void>;

}