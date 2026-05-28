import {
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { IAlumnoDatosAcademicosRepository } from '../../../domain/interfaces/alumnos_datos_academicos.repository.interface';

import { LoginAlumnoResponse } from '../../../dtos/responses/auth/login_alumno.response';

import { LoginAlumnoPresenter } from '../../presenters/auth/login_alumno.presenter';

@Injectable()
export class IniciarSesionUseCase {

  constructor(
    @Inject('IAlumnoDatosAcademicosRepository')
    private readonly alumnoRepository: IAlumnoDatosAcademicosRepository,

    private readonly jwtService: JwtService,

    private readonly configService: ConfigService,
  ) {}

  async Ejecutar(
    noControl: string,
    nip: string,
  ): Promise<LoginAlumnoResponse> {

    /*
    ============================================
    SUPER ADMIN TEMPORAL
    ============================================
    */

    if (
      noControl === 'superadmin'
      && nip === '1234'
    ) {

      const roles = ['SUPER_ADMIN'];

      const permisos = ['*'];

      const payload = {
        sub: 0,
        no_control: 'superadmin',

        roles,
        permisos,
      };

      const accessToken =
        await this.jwtService.signAsync(payload);

      const refreshToken =
        await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRATION',
          ) as any,
        });

      return {
        type: 'alumnos',

        attributes: {
          nombre: 'Super Admin',
          matricula: 'superadmin',
          creditos: 0,
          carrera: 'Sistema',
          semestre_activo: true,
        },

        roles,

        permisos,

        access_token: accessToken,

        refresh_token: refreshToken,
      };
    }

    /*
    ============================================
    ADMIN TEMPORAL
    ============================================
    */

    if (
      noControl === 'admin'
      && nip === '1234'
    ) {

      const roles = ['ADMIN'];

      const permisos = [
        'usuarios.read',
        'usuarios.create',
        'usuarios.update',

        'programas.read',
        'programas.create',
        'programas.update',
      ];

      const payload = {
        sub: 1,
        no_control: 'admin',

        roles,
        permisos,
      };

      const accessToken =
        await this.jwtService.signAsync(payload);

      const refreshToken =
        await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRATION',
          ) as any,
        });

      return {
        type: 'alumnos',

        attributes: {
          nombre: 'Administrador',
          matricula: 'admin',
          creditos: 0,
          carrera: 'Sistema',
          semestre_activo: true,
        },

        roles,

        permisos,

        access_token: accessToken,

        refresh_token: refreshToken,
      };
    }

    /*
    ============================================
    LOGIN REAL ALUMNOS
    ============================================
    */

    const alumno = await this.alumnoRepository
      .BuscarPorNoControl(noControl);

    if (!alumno) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    /*
      Validar NIP
    */
    if (!alumno.ValidarNip(Number(nip))) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    /*
      Obtener datos login
    */
    const datosLogin = await this.alumnoRepository
      .ObtenerDatosLoginPorNoControl(noControl);

    if (!datosLogin) {
      throw new UnauthorizedException(
        'No se pudieron obtener los datos del alumno',
      );
    }

    /*
      Obtener roles y permisos
    */
    const {
      roles,
      permisos,
    } = await this.alumnoRepository
      .ObtenerRolesYPermisos(noControl);

    /*
      Payload JWT
    */
    const payload = {
      sub: alumno.id,
      no_control: alumno.noControl,

      roles,
      permisos,
    };

    /*
      Access token
    */
    const accessToken = await this.jwtService
      .signAsync(payload);

    /*
      Refresh expiration
    */
    const refreshExpiration =
      this.configService.get<string>(
        'JWT_REFRESH_EXPIRATION',
      );

    if (!refreshExpiration) {
      throw new UnauthorizedException(
        'Configuración de refresh token no encontrada',
      );
    }

    /*
      Refresh token
    */
    const refreshToken = await this.jwtService
      .signAsync(payload, {
        expiresIn: refreshExpiration as any,
      });

    /*
      Response
    */
    return LoginAlumnoPresenter.Presentar(
      datosLogin,
      accessToken,
      refreshToken,
      roles,
      permisos,
    );
  }

}