import { SsProgramasPoco } from "../../../dtos/POCOS/servicio_social/ss_programas.poco";
import { CrearSsProgramaDto } from "../../../dtos/requests/Servicio Social/Programas/crear_ss_programas";
import { ActualizarSsProgramaDto } from "../../../dtos/requests/Servicio Social/Programas/avtualizar_ss_programas";

// Tipo auxiliar que representa el path del plan de trabajo
export interface ProgramaPaths {
  plan_trabajo?: string | null;
}

export interface ISsProgramasRepository {
  ObtenerTodos(): Promise<SsProgramasPoco[]>;
  ObtenerPorId(id: number): Promise<SsProgramasPoco | null>;
  ObtenerPorNombrePrograma(nombrePrograma: string): Promise<SsProgramasPoco[]>;
  ObtenerPorOrganizacion(idOrganizacion: number): Promise<SsProgramasPoco[]>;
  ObtenerPorTipoPrograma(idTipoPrograma: number): Promise<SsProgramasPoco[]>;
  ObtenerPorModalidad(modalidad: boolean): Promise<SsProgramasPoco[]>;
  ObtenerVigentes(): Promise<SsProgramasPoco[]>;
  Crear(dto: CrearSsProgramaDto, paths: ProgramaPaths): Promise<SsProgramasPoco>;
  Eliminar(id: number): Promise<void>;
  Actualizar(id: number, dto: ActualizarSsProgramaDto, paths: Partial<ProgramaPaths>): Promise<SsProgramasPoco>;
  ObtenerPathsPorId(id: number): Promise<ProgramaPaths | null>;
}