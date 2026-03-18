import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsOrganizaciones } from '../../logic/servicio_Social/Organizaciones/obtener_ss_organizaciones';
import { CrearSsOrganizacionUseCase } from '../../logic/servicio_Social/Organizaciones/crear_ss_organizaciones';
import { EliminarSsOrganizacionUseCase } from '../../logic/servicio_Social/Organizaciones/eliminar_ss_organizaciones';
import { CrearSsOrganizacionDto } from '../../../dtos/requests/Servicio Social/Organizaciones/Crear_Organoiazciones_DTO';

@ApiTags('Servicio Social - Organizaciones')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/organizaciones')
export class SsOrganizacionesController {

  constructor(
    private readonly obtenerSsOrganizacionesUseCase: ObtenerSsOrganizaciones,
    private readonly crearSsOrganizacionUseCase: CrearSsOrganizacionUseCase,
    private readonly eliminarSsOrganizacionUseCase: EliminarSsOrganizacionUseCase,
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva organización' })
  @ApiBody({ type: CrearSsOrganizacionDto })
  @ApiResponse({ status: 201, description: 'Organización creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Ya existe una organización con ese nombre' })
  async Crear(
    @Body() dto: CrearSsOrganizacionDto
  ) {
    return this.crearSsOrganizacionUseCase.Ejecutar(dto);
  }

  @Delete('id/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar organización por id' })
  @ApiParam({ name: 'id', type: Number, description: 'Id de la organización a eliminar' })
  @ApiResponse({ status: 204, description: 'Organización eliminada correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Organización no encontrada' })
  async EliminarPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.eliminarSsOrganizacionUseCase.EliminarPorId(id);
  }

  @Delete('nombre/:nombre')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar organizaciones por nombre' })
  @ApiParam({ name: 'nombre', type: String, description: 'Nombre de la organización a eliminar' })
  @ApiResponse({ status: 204, description: 'Organización eliminada correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontró ninguna organización con ese nombre' })
  async EliminarPorNombre(
    @Param('nombre') nombre: string
  ) {
    await this.eliminarSsOrganizacionUseCase.EliminarPorNombre(nombre);
  }

}