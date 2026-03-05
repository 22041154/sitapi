import { SsTiposProgramas } from "../../../dtos/POCOS/servicio_social/ss_tipos_programas.poco";

export interface ISsTiposProgramasRepository {

  ObtenerTodos(): Promise<SsTiposProgramas[]>;

  ObtenerPorId(id: number): Promise<SsTiposProgramas | null>;

  ObtenerPorNombreTipo(nombreTipo: string): Promise<SsTiposProgramas[]>;

}