export class LoginAlumnoResponse {

  type: string;

  attributes: {
    nombre: string;
    matricula: string;
    creditos: number;
    carrera: string;
  };

  access_token: string;

}