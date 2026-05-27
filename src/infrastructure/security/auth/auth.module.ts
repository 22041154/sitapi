import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from '../../../application/controllers/auth/auth.controller';

import { IniciarSesionUseCase } from '../../../application/logic/auth/iniciar-sesion.use-case';
import { RefrescarTokenUseCase } from '../../../application/logic/auth/refrescar-token.use.case';

import { AlumnoDatosAcademicosModule } from '../../modules/alumnos_datos_academicos.module';

@Module({
  imports: [
    AlumnoDatosAcademicosModule,

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>(
          'JWT_ACCESS_EXPIRATION',
        );

        if (!secret) {
          throw new Error(
            'JWT_SECRET no está definida en las variables de entorno',
          );
        }

        if (!expiresIn) {
          throw new Error(
            'JWT_ACCESS_EXPIRATION no está definida en las variables de entorno',
          );
        }

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
    }),
  ],

  providers: [
    IniciarSesionUseCase,
    RefrescarTokenUseCase,
  ],

  controllers: [
    AuthController,
  ],

  exports: [
    IniciarSesionUseCase,
    RefrescarTokenUseCase,
    JwtModule,
  ],
})
export class AuthModule {}