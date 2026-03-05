import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsOrganizaciones } from '../../logic/servicio_Social/Organizaciones/obtener_ss_organizaciones';

@UseGuards(JwtGuard)
@Controller('servicio-social/organizaciones')
export class SsOrganizacionesController {

  constructor(
    private readonly obtenerSsOrganizacionesUseCase: ObtenerSsOrganizaciones,
  ) {}

  @Get()
  async ObtenerTodos() {
    return this.obtenerSsOrganizacionesUseCase.ObtenerTodos();
  }

  @Get('id/:id')
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsOrganizacionesUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:nombre')
  async ObtenerPorNombreOrganizacion(
    @Param('nombre') nombre: string
  ) {
    return this.obtenerSsOrganizacionesUseCase.ObtenerPorNombreOrganizacion(nombre);
  }

  @Get('titular/:nombreTitular')
  async ObtenerPorNombreTitular(
    @Param('nombreTitular') nombreTitular: string
  ) {
    return this.obtenerSsOrganizacionesUseCase.ObtenerPorNombreTitular(nombreTitular);
  }

}