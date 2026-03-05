import { SsRoles } from "../../../dtos/POCOS/servicio_social/ss_roles.poco";

export interface ISsRolesRepository {

  ObtenerTodos(): Promise<SsRoles[]>;

  ObtenerPorId(id: number): Promise<SsRoles | null>;

  ObtenerPorNombreRol(rol: string): Promise<SsRoles[]>;

}