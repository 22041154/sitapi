import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    /*
      Obtener roles requeridos
    */
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    /*
      Si el endpoint no requiere roles
    */
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    /*
      Obtener request
    */
    const request =
      context.switchToHttp().getRequest();

    /*
      Usuario autenticado
    */
    const user = request.user;

    /*
      Validar existencia de roles
    */
    if (!user || !user.roles) {
      throw new ForbiddenException(
        'El usuario no tiene roles asignados',
      );
    }

    /*
      SUPER_ADMIN bypass
    */
    if (user.roles.includes('SUPER_ADMIN')) {
      return true;
    }

    /*
      Validar roles
    */
    const hasRole = requiredRoles.some(
      role => user.roles.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        'No tiene permisos para acceder a este recurso',
      );
    }

    return true;
  }

}