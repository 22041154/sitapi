import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { IniciarSesionUseCase } from '../../logic/auth/iniciar-sesion.use-case';
import { IniciarSesionDto } from '../../../dtos/requests/iniciar-sesion.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly iniciarSesionUseCase: IniciarSesionUseCase
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ 
    summary: 'Iniciar sesión', 
    description: 'Autentica al alumno con número de control y NIP' 
  })
  @ApiBody({ type: IniciarSesionDto })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna datos del alumno' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async signIn(
    @Body() dto: IniciarSesionDto
  ) {
    return this.iniciarSesionUseCase.Ejecutar(
      dto.no_control,
      dto.nip
    );
  }
}