import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsTiposProgramas } from '../../logic/servicio_Social/Tipos_Programas/obtener_ss_tipos_programas';

@UseGuards(JwtGuard)
@Controller('servicio-social/tipos-programas')
export class SsTiposProgramasController {

  constructor(
    private readonly obtenerSsTiposProgramasUseCase: ObtenerSsTiposProgramas,
  ) {}

  @Get()
  async ObtenerTodos() {
    return this.obtenerSsTiposProgramasUseCase.ObtenerTodos();
  }

  @Get('id/:id')
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsTiposProgramasUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:nombreTipo')
  async ObtenerPorNombreTipo(
    @Param('nombreTipo') nombreTipo: string
  ) {
    return this.obtenerSsTiposProgramasUseCase.ObtenerPorNombreTipo(nombreTipo);
  }

}