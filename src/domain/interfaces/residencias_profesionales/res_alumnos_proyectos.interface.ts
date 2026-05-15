import { ResAlumnosProyectos } from '../../../dtos/POCOS/residencias_profesionales/res_alumnos_proyectos.poco';
import { CrearResProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';
import { ActualizarResAlumnosProyectosDto } from '../../../dtos/requests/Residencias/AlumnosProyectos/actualizar-res-alumnos-proyectos.dto';

export interface IResAlumnosProyectosRepository {
  ObtenerTodos(): Promise<ResAlumnosProyectos[]>;
  ObtenerPorId(id: number): Promise<ResAlumnosProyectos | null>;
  ObtenerPorAlumno(idAlumno: number): Promise<ResAlumnosProyectos[]>;
  ObtenerPorProyecto(idProyecto: number): Promise<ResAlumnosProyectos[]>;
  Crear(dto: CrearResAlumnosProyectosDto): Promise<ResAlumnosProyectos>;
  Eliminar(id: number): Promise<void>;
  Actualizar(id: number, dto: ActualizarResAlumnosProyectosDto): Promise<ResAlumnosProyectos>;
}