import { Controller, Get, Param, ParseIntPipe, ParseBoolPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsProgramas } from '../../logic/servicio_Social/Programas/obtemer_ss_programas';

@UseGuards(JwtGuard)
@Controller('servicio-social/programas')
export class SsProgramasController {

  constructor(
    private readonly obtenerSsProgramasUseCase: ObtenerSsProgramas,
  ) {}

  @Get()
  async ObtenerTodos() {
    return this.obtenerSsProgramasUseCase.ObtenerTodos();
  }

  @Get('vigentes')
  async ObtenerVigentes() {
    return this.obtenerSsProgramasUseCase.ObtenerVigentes();
  }

  @Get('id/:id')
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:nombrePrograma')
  async ObtenerPorNombrePrograma(
    @Param('nombrePrograma') nombrePrograma: string
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorNombrePrograma(nombrePrograma);
  }

  @Get('organizacion/:idOrganizacion')
  async ObtenerPorOrganizacion(
    @Param('idOrganizacion', ParseIntPipe) idOrganizacion: number
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorOrganizacion(idOrganizacion);
  }

  @Get('tipo/:idTipoPrograma')
  async ObtenerPorTipoPrograma(
    @Param('idTipoPrograma', ParseIntPipe) idTipoPrograma: number
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorTipoPrograma(idTipoPrograma);
  }

  @Get('modalidad/:modalidad')
  async ObtenerPorModalidad(
    @Param('modalidad', ParseBoolPipe) modalidad: boolean
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorModalidad(modalidad);
  }

}