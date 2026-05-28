export class LoginAlumnoResponse {

  type: string;

  attributes: {
    nombre: string;
    matricula: string;
    creditos: number;
    carrera: string;
    semestre_activo: boolean;
  };

  roles: string[];

  permisos: string[];

  access_token: string;

  refresh_token: string;

}