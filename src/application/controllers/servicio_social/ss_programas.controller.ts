import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, ParseBoolPipe, UseGuards, HttpCode, HttpStatus, UseInterceptors, UploadedFiles, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';
import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';

import { ObtenerSsProgramas } from '../../logic/servicio_Social/Programas/obtemer_ss_programas';
import { CrearSsProgramaUseCase } from '../../logic/servicio_Social/Programas/crear_ss_programas';
import { EliminarSsProgramasUseCase } from '../../logic/servicio_Social/Programas/eliminar_ss_programas';
import { ActualizarSsProgramaUseCase } from '../../logic/servicio_Social/Programas/actualizar_ss_programas';
import { CrearSsProgramaDto } from '../../../dtos/requests/Servicio Social/Programas/crear_ss_programas';
import { ActualizarSsProgramaDto } from '../../../dtos/requests/Servicio Social/Programas/avtualizar_ss_programas';
import { SsProgramasPresenter } from '../../presenters/servicio_social/ss_programas.presenter';

// Configuración de Multer: archivos en memoria, sin tocar el disco
const memoriaStorage = memoryStorage();
const interceptorArchivos = FileFieldsInterceptor(
  [
    { name: 'plan_trabajo', maxCount: 1 },
  ],
  { storage: memoriaStorage },
);

type ArchivosPrograma = {
  plan_trabajo?: Express.Multer.File[];
};

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
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerTodos();
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('vigentes')
  @ApiOperation({ summary: 'Obtener programas vigentes' })
  async ObtenerVigentes() {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerVigentes();
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener programa por id' })
  @ApiParam({ name: 'id', type: Number })
  async ObtenerPorId(@Param('id', ParseIntPipe) id: number) {
    const poco = await this.obtenerSsProgramasUseCase.ObtenerPorId(id);
    return SsProgramasPresenter.Presentar(poco);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('nombre/:nombrePrograma')
  @ApiOperation({ summary: 'Obtener programas por nombre' })
  async ObtenerPorNombrePrograma(@Param('nombrePrograma') nombrePrograma: string) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorNombrePrograma(nombrePrograma);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('organizacion/:idOrganizacion')
  async ObtenerPorOrganizacion(@Param('idOrganizacion', ParseIntPipe) idOrganizacion: number) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorOrganizacion(idOrganizacion);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('tipo/:idTipoPrograma')
  async ObtenerPorTipoPrograma(@Param('idTipoPrograma', ParseIntPipe) idTipoPrograma: number) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorTipoPrograma(idTipoPrograma);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  /*
    ALUMNO + ADMIN + SUPER ADMIN
  */
  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('modalidad/:modalidad')
  async ObtenerPorModalidad(@Param('modalidad', ParseBoolPipe) modalidad: boolean) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorModalidad(modalidad);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  /*
    ADMIN + SUPER ADMIN
  */
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo programa' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(interceptorArchivos)
  async Crear(
    @Body() dto: CrearSsProgramaDto,
    @UploadedFiles() files: ArchivosPrograma,
  ) {
    const poco = await this.crearSsProgramaUseCase.Ejecutar(dto, files);
    return SsProgramasPresenter.Presentar(poco);
  }

  /*
    ADMIN + SUPER ADMIN
  */
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar un programa' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number, description: 'ID del programa a actualizar' })
  @UseInterceptors(interceptorArchivos)
  async Actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarSsProgramaDto,
    @UploadedFiles() files: ArchivosPrograma,
  ) {
    const poco = await this.actualizarSsProgramasUseCase.Ejecutar(id, dto, files);
    return SsProgramasPresenter.Presentar(poco);
  }

  /*
    ADMIN + SUPER ADMIN
  */
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un programa' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del programa a eliminar' })
  async Eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarSsProgramasUseCase.Ejecutar(id);
    return {
      statusCode: 200,
      message: `El programa con id ${id} fue eliminado correctamente.`,
    };
  }
}