import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { IniciarSesionUseCase } from '../../logic/auth/iniciar-sesion.use-case';
import { IniciarSesionDto } from '../../../dtos/requests/iniciar-sesion.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly iniciarSesionUseCase: IniciarSesionUseCase
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() dto: IniciarSesionDto
  ) {
      return this.iniciarSesionUseCase.Ejecutar(
      dto.no_control,
      dto.nip
    );
  }
}