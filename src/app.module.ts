import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// Módulos
import { BdModule } from './infrastructure/modules/bd.module';
import { AuthModule } from './infrastructure/security/auth/auth.module';
import { AlumnoDatosAcademicosModule } from './infrastructure/modules/alumnos_datos_academicos.module';
import { JwtMiddleware } from './infrastructure/security/auth/jwt.middleware';

import { SsOrganizacionesModule } from './infrastructure/modules/servicio_social/ss_organizaciones.module';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Módulo de base de datos
    BdModule,

    // Módulo de acceso a datos
    AlumnoDatosAcademicosModule,

    // Módulo de autenticación
    AuthModule,

    SsOrganizacionesModule
  ],

  controllers: [
    
  ],
})

export class AppModule implements NestModule {
  /**
   * Protege todas las rutas EXCEPTO el login
   */
  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(JwtMiddleware)

      // RUTA PÚBLICA (login)
      .exclude(
        {
          path: 'auth/login',
          method: RequestMethod.POST,
        }
      )

      // TODAS las demás rutas protegidas
      .forRoutes('*');
  }
}