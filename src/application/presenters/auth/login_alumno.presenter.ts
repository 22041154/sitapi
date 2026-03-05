import { LoginAlumnoResponse } from '../../../dtos/responses/auth/login_alumno.response';
import { DatosLoginAlumno } from '../../../dtos/POCOS/datos_logfn_alumno.poco';

export class LoginAlumnoPresenter {

  static Presentar(
    datos: DatosLoginAlumno,
    accessToken: string,
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
    response.access_token = accessToken;

    return response;
  }

}