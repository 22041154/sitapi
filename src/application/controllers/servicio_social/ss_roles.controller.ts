import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsRoles } from '../../logic/servicio_Social/Roles/obtener_ss_roles';

@ApiTags('Servicio Social - Roles')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/roles')
export class SsRolesController {

  constructor(
    private readonly obtenerSsRolesUseCase: ObtenerSsRoles,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron roles' })
  async ObtenerTodos() {
    return this.obtenerSsRolesUseCase.ObtenerTodos();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener rol por id' })
  @ApiParam({ name: 'id', type: Number, description: 'Id del rol' })
  @ApiResponse({ status: 200, description: 'Rol encontrado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsRolesUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:rol')
  @ApiOperation({ summary: 'Obtener roles por nombre' })
  @ApiParam({ name: 'rol', type: String, description: 'Nombre del rol a buscar' })
  @ApiResponse({ status: 200, description: 'Roles encontrados correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron roles con ese nombre' })
  async ObtenerPorNombreRol(
    @Param('rol') rol: string
  ) {
    return this.obtenerSsRolesUseCase.ObtenerPorNombreRol(rol);
  }

}