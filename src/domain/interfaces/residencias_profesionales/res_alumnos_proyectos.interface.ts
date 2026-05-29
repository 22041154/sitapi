import { ResAlumnosProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_alumnos_proyectos.poco';
import { CrearResAlumnoProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/crear_res_alumnos_proyectos.request';
import { ActualizarResAlumnoProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/actualizar_res_alumnos_proyectos.request';

export interface IResAlumnosProyectosRepository {

    ObtenerTodos(): Promise<ResAlumnosProyectos[]>;

    ObtenerPorId(id: number): Promise<ResAlumnosProyectos | null>;

    ObtenerPorProyecto(idProyecto: number): Promise<ResAlumnosProyectos[]>;

    ObtenerPorAlumno(idAlumnoAcademico: number): Promise<ResAlumnosProyectos[]>;

    ObtenerPorAsesorInterno(idAsesorInterno: number): Promise<ResAlumnosProyectos[]>;

    ObtenerPorDictamen(idCatalogoDictamen: number): Promise<ResAlumnosProyectos[]>;

    Crear(dto: CrearResAlumnoProyectoDto): Promise<ResAlumnosProyectos>;

    Actualizar(
        id: number,
        dto: ActualizarResAlumnoProyectoDto,
    ): Promise<ResAlumnosProyectos>;

    Eliminar(id: number): Promise<void>;

    // NUEVO MÉTODO
    VerificarPertenencia(
        idAlumnoProyecto: number,
        idAlumnoAcademico: number,
    ): Promise<boolean>;

}