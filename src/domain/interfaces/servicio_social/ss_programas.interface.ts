import { SsProgramas } from "../../../dtos/POCOS/servicio_social/ss_programas.poco";

export interface ISsProgramasRepository {

  ObtenerTodos(): Promise<SsProgramas[]>;

  ObtenerPorId(id: number): Promise<SsProgramas | null>;

  ObtenerPorNombrePrograma(nombrePrograma: string): Promise<SsProgramas[]>;

  ObtenerPorOrganizacion(idOrganizacion: number): Promise<SsProgramas[]>;

  ObtenerPorTipoPrograma(idTipoPrograma: number): Promise<SsProgramas[]>;

  ObtenerPorModalidad(modalidad: boolean): Promise<SsProgramas[]>;

  ObtenerVigentes(): Promise<SsProgramas[]>;

}