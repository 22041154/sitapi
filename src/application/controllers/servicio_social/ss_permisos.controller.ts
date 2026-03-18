import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsPermisos } from '../../logic/servicio_Social/Permisos/obtener_ss_permisos';
import { CrearSsPermisosDto } from '../../../dtos/requests/Servicio Social/Permisos/crear_ss_permisos.dto';
import { CrearSsPermisosUseCase } from '../../logic/servicio_Social/Permisos/crear_ss_permisos';

@ApiTags('Servicio Social - Permisos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/permisos')
export class SsPermisosController {

  constructor(
    private readonly obtenerSsPermisosUseCase: ObtenerSsPermisos,
    private readonly crearSsPermisosUseCase: CrearSsPermisosUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los permisos' })
  @ApiResponse({ status: 200, description: 'Lista de permisos obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron permisos' })
  async ObtenerTodos() {
    return this.obtenerSsPermisosUseCase.ObtenerTodos();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener permiso por id' })
  @ApiParam({ name: 'id', type: Number, description: 'Id del permiso' })
  @ApiResponse({ status: 200, description: 'Permiso encontrado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsPermisosUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:permiso')
  @ApiOperation({ summary: 'Obtener permisos por nombre' })
  @ApiParam({ name: 'permiso', type: String, description: 'Nombre del permiso a buscar' })
  @ApiResponse({ status: 200, description: 'Permisos encontrados correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron permisos con ese nombre' })
  async ObtenerPorNombrePermiso(
    @Param('permiso') permiso: string
  ) {
    return this.obtenerSsPermisosUseCase.ObtenerPorNombrePermiso(permiso);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo permiso' })
  @ApiBody({ type: CrearSsPermisosDto })
  async Crear(@Body() dto: CrearSsPermisosDto) {
    return this.crearSsPermisosUseCase.Ejecutar(dto);
  }

}