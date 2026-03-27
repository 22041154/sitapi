import { SsProgramas } from "../../../dtos/POCOS/servicio_social/ss_programas.poco";
import { CrearSsProgramaDto } from "../../../dtos/requests/Servicio Social/Programas/crear_ss_programas";

export interface ISsProgramasRepository {

  ObtenerTodos(): Promise<SsProgramas[]>;

  ObtenerPorId(id: number): Promise<SsProgramas | null>;

  ObtenerPorNombrePrograma(nombrePrograma: string): Promise<SsProgramas[]>;

  ObtenerPorOrganizacion(idOrganizacion: number): Promise<SsProgramas[]>;

  ObtenerPorTipoPrograma(idTipoPrograma: number): Promise<SsProgramas[]>;

  ObtenerPorModalidad(modalidad: boolean): Promise<SsProgramas[]>;

  ObtenerVigentes(): Promise<SsProgramas[]>;

  Crear(dto: CrearSsProgramaDto, planTrabajo?: Buffer): Promise<SsProgramas>;
  
  Eliminar(id: number): Promise<void>;
}