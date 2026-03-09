import { SsSeguimientoAlumnosPoco } from '../../../dtos/POCOS/servicio_social/ss_seguimiento_alumnos.poco';

export const ISS_SEGUIMIENTO_ALUMNOS_REPOSITORY = 'ISS_SEGUIMIENTO_ALUMNOS_REPOSITORY';

export interface ISsSeguimientoAlumnosRepository {
  obtenerTodos(): Promise<SsSeguimientoAlumnosPoco[]>;
}