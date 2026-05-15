import { ResDocumentosResidencias } from '../../../dtos/POCOS/residencias_profesionales/res_documentos_residencias.poco';
import { CrearResDocumentosResidenciasDto } from '../../../dtos/requests/Residencias Profesionales/res_documentos_residencias/res_documentos_residencias.dto';
import { ActualizarResDocumentosResidenciasDto } from '../../../dtos/requests/Residencias Profesionales/res_documentos_residencias/actualizar_res_documentos_residencias.dto';

export interface IResDocumentosResidenciasRepository {
  ObtenerTodos(): Promise<ResDocumentosResidencias[]>;
  ObtenerPorId(id: number): Promise<ResDocumentosResidencias | null>;
  ObtenerPorAlumno(idAlumno: number): Promise<ResDocumentosResidencias[]>;
  ObtenerPorTipoDocumento(idTipoDocumento: number): Promise<ResDocumentosResidencias[]>;
  Crear(dto: CrearResDocumentosResidenciasDto): Promise<ResDocumentosResidencias>;
  Eliminar(id: number): Promise<void>;
  Actualizar(id: number, dto: ActualizarResDocumentosResidenciasDto): Promise<ResDocumentosResidencias>;
}