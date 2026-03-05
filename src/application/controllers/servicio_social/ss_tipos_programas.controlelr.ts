import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsTiposProgramas } from '../../logic/servicio_Social/Tipos_Programas/obtener_ss_tipos_programas';

@ApiTags('Servicio Social - Tipos de Programas')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/tipos-programas')
export class SsTiposProgramasController {

  constructor(
    private readonly obtenerSsTiposProgramasUseCase: ObtenerSsTiposProgramas,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de programas' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de programas obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron tipos de programas' })
  async ObtenerTodos() {
    return this.obtenerSsTiposProgramasUseCase.ObtenerTodos();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener tipo de programa por id' })
  @ApiParam({ name: 'id', type: Number, description: 'Id del tipo de programa' })
  @ApiResponse({ status: 200, description: 'Tipo de programa encontrado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Tipo de programa no encontrado' })
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.obtenerSsTiposProgramasUseCase.ObtenerPorId(id);
  }

  @Get('nombre/:nombreTipo')
  @ApiOperation({ summary: 'Obtener tipos de programas por nombre' })
  @ApiParam({ name: 'nombreTipo', type: String, description: 'Nombre del tipo de programa a buscar' })
  @ApiResponse({ status: 200, description: 'Tipos de programas encontrados correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron tipos de programas con ese nombre' })
  async ObtenerPorNombreTipo(
    @Param('nombreTipo') nombreTipo: string
  ) {
    return this.obtenerSsTiposProgramasUseCase.ObtenerPorNombreTipo(nombreTipo);
  }

}