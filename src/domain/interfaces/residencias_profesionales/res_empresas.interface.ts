import { ResEmpresas } from '../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';
import { CrearResEmpresaDto } from '../../../dtos/requests/Residencias Profesionales/res_empresas/crear_res_empresas.dto';
import { ActualizarResEmpresaDto } from '../../../dtos/requests/Residencias Profesionales/res_empresas/actualizar_res_empresas.dto';

export interface IResEmpresasRepository {
  ObtenerTodos(): Promise<ResEmpresas[]>;
  ObtenerPorId(id: number): Promise<ResEmpresas | null>;
  ObtenerPorNombreEmpresa(nombre: string): Promise<ResEmpresas[]>;
  ObtenerPorResponsable(responsable: string): Promise<ResEmpresas[]>;
  Crear(dto: CrearResEmpresaDto): Promise<ResEmpresas>;
  Eliminar(id: number): Promise<void>;
  EliminarPorNombre(nombre: string): Promise<void>;
  Actualizar(id: number, dto: ActualizarResEmpresaDto): Promise<ResEmpresas>;
}