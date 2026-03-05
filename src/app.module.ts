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
import { SsTiposProgramasModule } from './infrastructure/modules/servicio_social/ss_tipos_programas.module';
import { SsProgramasModule } from './infrastructure/modules/servicio_social/ss_programas.module';
import { SsRolesModule } from './infrastructure/modules/servicio_social/ss_roles.moduke';
import { SsPermisosModule } from './infrastructure/modules/servicio_social/ss_permisos.module';

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

    SsOrganizacionesModule,
    SsTiposProgramasModule,
    SsProgramasModule,
    SsRolesModule,
    SsPermisosModule
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