import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, ParseBoolPipe, UseGuards, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';
import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';

import { ObtenerSsProgramas } from '../../logic/servicio_Social/Programas/obtemer_ss_programas';
import { CrearSsProgramaUseCase } from '../../logic/servicio_Social/Programas/crear_ss_programas';
import { CrearSsProgramaDto } from '../../../dtos/requests/Servicio Social/Programas/crear_ss_programas';
import { EliminarSsProgramasUseCase } from '../../logic/servicio_Social/Programas/eliminar_ss_programas';
import { ActualizarSsProgramaUseCase } from '../../logic/servicio_Social/Programas/actualizar_ss_programas';
import { ActualizarSsProgramaDto } from '../../../dtos/requests/Servicio Social/Programas/avtualizar_ss_programas';
import { SsProgramasPresenter } from '../../presenters/servicio_social/ss_programas.presenter';

@ApiTags('Servicio Social - Programas')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard)
@Controller('servicio-social/programas')
export class SsProgramasController {

  constructor(
    private readonly obtenerSsProgramasUseCase: ObtenerSsProgramas,
    private readonly crearSsProgramaUseCase: CrearSsProgramaUseCase,
    private readonly eliminarSsProgramasUseCase: EliminarSsProgramasUseCase,
    private readonly actualizarSsProgramasUseCase: ActualizarSsProgramaUseCase,
  ) {}

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get()
  @ApiOperation({ summary: 'Obtener todos los programas' })
  @ApiResponse({ status: 200, description: 'Lista de programas obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'No se encontraron programas' })
  async ObtenerTodos() {
    return this.obtenerSsProgramasUseCase.ObtenerTodos();
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('vigentes')
  @ApiOperation({ summary: 'Obtener programas vigentes' })
  async ObtenerVigentes() {
    return this.obtenerSsProgramasUseCase.ObtenerVigentes();
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener programa por id' })
  @ApiParam({ name: 'id', type: Number })
  async ObtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerSsProgramasUseCase.ObtenerPorId(id);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('nombre/:nombrePrograma')
  @ApiOperation({ summary: 'Obtener programas por nombre' })
  async ObtenerPorNombrePrograma(@Param('nombrePrograma') nombrePrograma: string) {
    return this.obtenerSsProgramasUseCase.ObtenerPorNombrePrograma(nombrePrograma);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('organizacion/:idOrganizacion')
  async ObtenerPorOrganizacion(@Param('idOrganizacion', ParseIntPipe) idOrganizacion: number) {
    return this.obtenerSsProgramasUseCase.ObtenerPorOrganizacion(idOrganizacion);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('tipo/:idTipoPrograma')
  async ObtenerPorTipoPrograma(@Param('idTipoPrograma', ParseIntPipe) idTipoPrograma: number) {
    return this.obtenerSsProgramasUseCase.ObtenerPorTipoPrograma(idTipoPrograma);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('modalidad/:modalidad')
  async ObtenerPorModalidad(@Param('modalidad', ParseBoolPipe) modalidad: boolean) {
    return this.obtenerSsProgramasUseCase.ObtenerPorModalidad(modalidad);
  }

  /*
    ADMIN + SUPER ADMIN
  */
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('plan_trabajo'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Crear un nuevo programa' })
  async Crear(
    @Body() dto: CrearSsProgramaDto,
    @UploadedFile() file?: any,
  ) {
    const planTrabajo = file ? file.buffer : undefined;
    return this.crearSsProgramaUseCase.Ejecutar(dto, planTrabajo);
  }

  /*
    ADMIN + SUPER ADMIN
  */
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Put('id/:id')
  @UseInterceptors(FileInterceptor('plan_trabajo'))
  async Actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarSsProgramaDto,
    @UploadedFile() file?: any,
  ) {
    const planTrabajo = file ? file.buffer : undefined;
    const poco = await this.actualizarSsProgramasUseCase.Ejecutar(id, dto, planTrabajo);
    return SsProgramasPresenter.Presentar(poco);
  }

  /*
    ADMIN + SUPER ADMIN
  */
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Delete('id/:id')
  async Eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarSsProgramasUseCase.Ejecutar(id);
    return {
      statusCode: 200,
      message: `El programa con id ${id} fue eliminado correctamente.`,
    };
  }
}