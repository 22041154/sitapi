import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './decorators/permisions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.permisos) {
      throw new ForbiddenException(
        'No tiene permisos para realizar esta acción.',
      );
    }

    if (user.roles?.includes('SUPER_ADMIN')) {
      return true;
    }

    const hasPermission =
      user.permisos.includes('*') ||
      requiredPermissions.some((permission) =>
        user.permisos.includes(permission),
      );

    if (!hasPermission) {
      throw new ForbiddenException(
        'No tiene permisos para realizar esta acción.',
      );
    }

    return true;
  }
}