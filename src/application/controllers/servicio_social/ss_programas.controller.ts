import { Controller, Get, Param, ParseIntPipe, ParseBoolPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsProgramas } from '../../logic/servicio_Social/Programas/obtemer_ss_programas';

@ApiTags('Servicio Social - Programas')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/programas')
export class SsProgramasController {

  constructor(
    private readonly obtenerSsProgramasUseCase: ObtenerSsProgramas,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los programas' })
  @ApiResponse({ status: 200, description: 'Lista de programas obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron programas' })
  async ObtenerTodos() {
    return this.obtenerSsProgramasUseCase.ObtenerTodos();
  }

  @Get('vigentes')
  @ApiOperation({ summary: 'Obtener programas vigentes' })
  @ApiResponse({ status: 200, description: 'Lista de programas vigentes obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron programas vigentes' })
  async ObtenerVigentes() {
    return this.obtenerSsProgramasUseCase.ObtenerVigentes();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener programa por id' })
  @ApiParam({ name: 'id', type: Number, description: 'Id del programa' })
  @ApiResponse({ status: 200, description: 'Programa encontrado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Programa no encontrado' })
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:nombrePrograma')
  @ApiOperation({ summary: 'Obtener programas por nombre' })
  @ApiParam({ name: 'nombrePrograma', type: String, description: 'Nombre del programa a buscar' })
  @ApiResponse({ status: 200, description: 'Programas encontrados correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron programas con ese nombre' })
  async ObtenerPorNombrePrograma(
    @Param('nombrePrograma') nombrePrograma: string
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorNombrePrograma(nombrePrograma);
  }

  @Get('organizacion/:idOrganizacion')
  @ApiOperation({ summary: 'Obtener programas por organización' })
  @ApiParam({ name: 'idOrganizacion', type: Number, description: 'Id de la organización' })
  @ApiResponse({ status: 200, description: 'Programas encontrados correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron programas para esa organización' })
  async ObtenerPorOrganizacion(
    @Param('idOrganizacion', ParseIntPipe) idOrganizacion: number
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorOrganizacion(idOrganizacion);
  }

  @Get('tipo/:idTipoPrograma')
  @ApiOperation({ summary: 'Obtener programas por tipo' })
  @ApiParam({ name: 'idTipoPrograma', type: Number, description: 'Id del tipo de programa' })
  @ApiResponse({ status: 200, description: 'Programas encontrados correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron programas para ese tipo' })
  async ObtenerPorTipoPrograma(
    @Param('idTipoPrograma', ParseIntPipe) idTipoPrograma: number
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorTipoPrograma(idTipoPrograma);
  }

  @Get('modalidad/:modalidad')
  @ApiOperation({ summary: 'Obtener programas por modalidad', description: 'true = interno, false = externo' })
  @ApiParam({ name: 'modalidad', type: Boolean, description: 'Modalidad del programa (true = interno, false = externo)' })
  @ApiResponse({ status: 200, description: 'Programas encontrados correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron programas con esa modalidad' })
  async ObtenerPorModalidad(
    @Param('modalidad', ParseBoolPipe) modalidad: boolean
  ) {
    return this.obtenerSsProgramasUseCase.ObtenerPorModalidad(modalidad);
  }

}