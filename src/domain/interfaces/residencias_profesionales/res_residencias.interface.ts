import { ResResidencias } from '../../../dtos/POCOS/residencias_profesionales/res_residencias.poco';
import { CrearResResidenciaDto } from '../../../dtos/requests/Residencias Profesionales/res_residencias/crear_res_residencia.dto';
import { ActualizarResResidenciaDto } from '../../../dtos/requests/Residencias Profesionales/res_residencias/actualizar_res_residencias.dto';

export interface IResResidenciasRepository {
  ObtenerTodos(): Promise<ResResidencias[]>;
  ObtenerPorId(id: number): Promise<ResResidencias | null>;
  ObtenerPorAlumno(idAlumno: number): Promise<ResResidencias[]>;
  ObtenerPorEmpresa(idEmpresa: number): Promise<ResResidencias[]>;
  ObtenerPorPeriodo(idPeriodo: number): Promise<ResResidencias[]>;
  Crear(dto: CrearResResidenciaDto): Promise<ResResidencias>;
  Eliminar(id: number): Promise<void>;
  Actualizar(id: number, dto: ActualizarResResidenciaDto): Promise<ResResidencias>;
}