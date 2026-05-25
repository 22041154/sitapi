import { ResCalificaciones } from '../../../dtos/POCOS/residencias_profesionales/res_calificaciones.poco';
import { CrearResCalificacionDto } from '../../../dtos/requests/Residencias Profesionales/res_calificaciones/crear_res_calificaciones.request';
import { ActualizarResCalificacionDto } from '../../../dtos/requests/Residencias Profesionales/res_calificaciones/actualizar_res_calificaciones.request';

export interface IResCalificacionesRepository {

    ObtenerTodos(): Promise<ResCalificaciones[]>;

    ObtenerPorId(
        id: number,
    ): Promise<ResCalificaciones | null>;

    ObtenerPorAlumnoProyecto(
        idAlumnoProyecto: number,
    ): Promise<ResCalificaciones | null>;

    ObtenerPorMateria(
        idMateria: number,
    ): Promise<ResCalificaciones[]>;

    ObtenerPorGrupo(
        idGrupo: number,
    ): Promise<ResCalificaciones[]>;

    ObtenerPorFolioActa(
        folioActa: string,
    ): Promise<ResCalificaciones[]>;

    ObtenerCapturadas(): Promise<ResCalificaciones[]>;

    ObtenerPendientesCaptura(): Promise<ResCalificaciones[]>;

    Crear(
        dto: CrearResCalificacionDto,
    ): Promise<ResCalificaciones>;

    Actualizar(
        id: number,
        dto: ActualizarResCalificacionDto,
    ): Promise<ResCalificaciones>;

    Eliminar(
        id: number,
    ): Promise<void>;

}