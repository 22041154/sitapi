import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException('Token no proporcionado');
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Formato de token inválido');
      }

      const payload = await this.jwtService.verifyAsync(token);
      req['user'] = payload;
      
      next();
    } catch (error) {
      // Si el error ya es UnauthorizedException, lo relanzamos
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      // Para cualquier otro error (incluyendo JWT)
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}