import { ResAsesorIntProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_asesor_int_proyecto';
import { CrearResAsesorIntProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/res_asesor_int_proyecto.dto';
import { ActualizarResAsesorIntProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/actualizar_res_asesor_int_proyecto.dto';

export interface IResAsesorIntProyectosRepository {

    ObtenerTodos(): Promise<ResAsesorIntProyectos[]>;
    ObtenerPorId( id: number,): Promise<ResAsesorIntProyectos | null>;
    ObtenerPorProyecto( idProyecto: number,): Promise<ResAsesorIntProyectos[]>;
    ObtenerPorPersonalAcademico(idPersonal: number,): Promise<ResAsesorIntProyectos[]>;
    ObtenerAsignacion(idProyecto: number, idPersonal: number,): Promise<ResAsesorIntProyectos | null>;
    Crear( dto: CrearResAsesorIntProyectoDto, ): Promise<ResAsesorIntProyectos>;
    Actualizar( id: number, dto: ActualizarResAsesorIntProyectoDto, ): Promise<ResAsesorIntProyectos>;
    Eliminar( id: number, ): Promise<void>;

}