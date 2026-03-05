import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsOrganizaciones } from '../../logic/servicio_Social/Organizaciones/obtener_ss_organizaciones';

@ApiTags('Servicio Social - Organizaciones')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/organizaciones')
export class SsOrganizacionesController {

  constructor(
    private readonly obtenerSsOrganizacionesUseCase: ObtenerSsOrganizaciones,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las organizaciones' })
  @ApiResponse({ status: 200, description: 'Lista de organizaciones obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron organizaciones' })
  async ObtenerTodos() {
    return this.obtenerSsOrganizacionesUseCase.ObtenerTodos();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener organización por id' })
  @ApiParam({ name: 'id', type: Number, description: 'Id de la organización' })
  @ApiResponse({ status: 200, description: 'Organización encontrada correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Organización no encontrada' })
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsOrganizacionesUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:nombre')
  @ApiOperation({ summary: 'Obtener organizaciones por nombre' })
  @ApiParam({ name: 'nombre', type: String, description: 'Nombre de la organización a buscar' })
  @ApiResponse({ status: 200, description: 'Organizaciones encontradas correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron organizaciones con ese nombre' })
  async ObtenerPorNombreOrganizacion(
    @Param('nombre') nombre: string
  ) {
    return this.obtenerSsOrganizacionesUseCase.ObtenerPorNombreOrganizacion(nombre);
  }

  @Get('titular/:nombreTitular')
  @ApiOperation({ summary: 'Obtener organizaciones por nombre del titular' })
  @ApiParam({ name: 'nombreTitular', type: String, description: 'Nombre del titular de la organización' })
  @ApiResponse({ status: 200, description: 'Organizaciones encontradas correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron organizaciones con ese titular' })
  async ObtenerPorNombreTitular(
    @Param('nombreTitular') nombreTitular: string
  ) {
    return this.obtenerSsOrganizacionesUseCase.ObtenerPorNombreTitular(nombreTitular);
  }

}