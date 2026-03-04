import { SsOrganizaciones } from "../../../dtos/POCOS/servicio_social/ss_organizaciones.poco";

export interface ISsOrganizacionesRepository {

  ObtenerTodos(): Promise<SsOrganizaciones[]>;

  ObtenerPorId(id: number): Promise<SsOrganizaciones | null>;

  ObtenerPorNombreOrganizacion(nombre: string): Promise<SsOrganizaciones[]>;

  ObtenerPorNombreTitular(nombreTitular: string): Promise<SsOrganizaciones[]>;

}