export class LoginAlumnoResponse {

  type: string;

  attributes: {
    nombre: string;
    matricula: string;
    creditos: number;
    carrera: string;
    semestre_activo: boolean;
  };

  access_token: string;

}