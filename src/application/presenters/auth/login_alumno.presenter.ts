import { LoginAlumnoResponse } from '../../../dtos/responses/auth/login_alumno.response';
import { DatosLoginAlumno } from '../../../dtos/POCOS/datos_logfn_alumno.poco';

export class LoginAlumnoPresenter {
  static Presentar(
    datos: DatosLoginAlumno,
    accessToken: string,
    refreshToken: string,
    roles: string[],
    permisos: string[],
    expiresInSeconds: number,   // ← nuevo parámetro
  ): LoginAlumnoResponse {
    const response = new LoginAlumnoResponse();

    response.type = 'alumnos';

    response.attributes = {
      nombre: datos.nombreCompleto,
      matricula: datos.matricula,
      creditos: datos.creditos,
      carrera: datos.carrera,
      semestre_activo: datos.SemestreActivo,
    };

    response.roles = roles;
    response.permisos = permisos;
    response.access_token = accessToken;
    response.refresh_token = refreshToken;
    response.Expires = expiresInSeconds;   // ← asignación del nuevo campo

    return response;
  }
}