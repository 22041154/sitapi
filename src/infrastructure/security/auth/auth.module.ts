import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../../../application/controllers/auth/auth.controller';
import { IniciarSesionUseCase } from '../../../application/logic/auth/iniciar-sesion.use-case';
import { AlumnoDatosAcademicosModule } from '../../modules/alumnos_datos_academicos.module';

@Module({
  imports: [
    AlumnoDatosAcademicosModule,

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') as any,
        },
      }),
    }),
  ],

  providers: [
    IniciarSesionUseCase
  ],

  controllers: [
    AuthController
  ],

  exports: [
    IniciarSesionUseCase,
    JwtModule
  ],
})
export class AuthModule {}
