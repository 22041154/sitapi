import { Controller, Get, Post, Param, Body, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsTiposProgramas } from '../../logic/servicio_Social/Tipos_Programas/obtener_ss_tipos_programas';
import { CrearSsTipoProgramaUseCase } from '../../logic/servicio_Social/Tipos_Programas/crear_ss_tipos_programas';
import { CrearSsTipoProgramaDto } from '../../../dtos/requests/Servicio Social/Tipos_Programas/crear_ss_tipos_programas';

@ApiTags('Servicio Social - Tipos de Programas')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/tipos-programas')
export class SsTiposProgramasController {

  constructor(
    private readonly obtenerSsTiposProgramasUseCase: ObtenerSsTiposProgramas,
    private readonly crearSsTipoProgramaUseCase: CrearSsTipoProgramaUseCase,
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo tipo de programa' })
  @ApiBody({ type: CrearSsTipoProgramaDto })
  @ApiResponse({ status: 201, description: 'Tipo de programa creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Ya existe un tipo de programa con ese nombre' })
  async Crear(
    @Body() dto: CrearSsTipoProgramaDto
  ) {
    return this.crearSsTipoProgramaUseCase.Ejecutar(dto);
  }

}