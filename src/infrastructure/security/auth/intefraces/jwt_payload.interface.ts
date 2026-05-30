export interface JwtPayload {
  sub: number;
  no_control: string;
  roles: string[];
  permisos: string[];
  rol: string;
  idAlumnoAcademico: number | null;
}