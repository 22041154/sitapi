import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  ParseBoolPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';
import { PermissionsGuard } from '../../../infrastructure/security/auth/permisions.guard';

import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';
import { Permissions } from '../../../infrastructure/security/auth/decorators/permisions.decorator';

import { ObtenerSsProgramas } from '../../logic/servicio_Social/Programas/obtemer_ss_programas';
import { CrearSsProgramaUseCase } from '../../logic/servicio_Social/Programas/crear_ss_programas';
import { EliminarSsProgramasUseCase } from '../../logic/servicio_Social/Programas/eliminar_ss_programas';
import { ActualizarSsProgramaUseCase } from '../../logic/servicio_Social/Programas/actualizar_ss_programas';
import { CrearSsProgramaDto } from '../../../dtos/requests/Servicio Social/Programas/crear_ss_programas';
import { ActualizarSsProgramaDto } from '../../../dtos/requests/Servicio Social/Programas/avtualizar_ss_programas';
import { SsProgramasPresenter } from '../../presenters/servicio_social/ss_programas.presenter';

import { FiltroPdf } from '../../../infrastructure/security/filters/archivo_pdf.filter';
import { ValidarPdfPipe } from '../../../infrastructure/security/pipes/validar_pdf.pipe';

const memoriaStorage = memoryStorage();
const interceptorArchivos = FileFieldsInterceptor(
  [{ name: 'plan_trabajo', maxCount: 1 }],
  {
    storage: memoriaStorage,
    fileFilter: FiltroPdf,
    limits: { fileSize: 5 * 1024 * 1024 },
  },
);

type ArchivosPrograma = {
  plan_trabajo?: Express.Multer.File[];
};

@ApiTags('Servicio Social - Programas')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard, PermissionsGuard)
@Controller('servicio-social/programas')
export class SsProgramasController {
  constructor(
    private readonly obtenerSsProgramasUseCase: ObtenerSsProgramas,
    private readonly crearSsProgramaUseCase: CrearSsProgramaUseCase,
    private readonly eliminarSsProgramasUseCase: EliminarSsProgramasUseCase,
    private readonly actualizarSsProgramasUseCase: ActualizarSsProgramaUseCase,
  ) {}

  // ─── GET ─────────────────────────────────────────────────────────────────

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.read')
  @Get()
  @ApiOperation({ summary: 'Obtener todos los programas' })
  @ApiResponse({ status: 200, description: 'Lista de programas obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  async ObtenerTodos() {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerTodos();
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.read')
  @Get('vigentes')
  @ApiOperation({ summary: 'Obtener programas vigentes' })
  @ApiResponse({ status: 200, description: 'Programas vigentes obtenidos correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  async ObtenerVigentes() {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerVigentes();
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.read')
  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener programa por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del programa' })
  @ApiResponse({ status: 200, description: 'Programa obtenido correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  @ApiResponse({ status: 404, description: 'Programa no encontrado' })
  async ObtenerPorId(@Param('id', ParseIntPipe) id: number) {
    const poco = await this.obtenerSsProgramasUseCase.ObtenerPorId(id);
    return SsProgramasPresenter.Presentar(poco);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.read')
  @Get('nombre/:nombrePrograma')
  @ApiOperation({ summary: 'Obtener programas por nombre' })
  @ApiParam({ name: 'nombrePrograma', type: String, description: 'Nombre del programa' })
  @ApiResponse({ status: 200, description: 'Programas obtenidos correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  async ObtenerPorNombrePrograma(@Param('nombrePrograma') nombrePrograma: string) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorNombrePrograma(nombrePrograma);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.read')
  @Get('organizacion/:idOrganizacion')
  @ApiOperation({ summary: 'Obtener programas por ID de organización' })
  @ApiParam({ name: 'idOrganizacion', type: Number, description: 'ID de la organización' })
  @ApiResponse({ status: 200, description: 'Programas obtenidos correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  async ObtenerPorOrganizacion(@Param('idOrganizacion', ParseIntPipe) idOrganizacion: number) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorOrganizacion(idOrganizacion);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.read')
  @Get('tipo/:idTipoPrograma')
  @ApiOperation({ summary: 'Obtener programas por tipo' })
  @ApiParam({ name: 'idTipoPrograma', type: Number, description: 'ID del tipo de programa' })
  @ApiResponse({ status: 200, description: 'Programas obtenidos correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  async ObtenerPorTipoPrograma(@Param('idTipoPrograma', ParseIntPipe) idTipoPrograma: number) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorTipoPrograma(idTipoPrograma);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.read')
  @Get('modalidad/:modalidad')
  @ApiOperation({ summary: 'Obtener programas por modalidad' })
  @ApiParam({ name: 'modalidad', type: Boolean, description: 'true = presencial, false = virtual' })
  @ApiResponse({ status: 200, description: 'Programas obtenidos correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  async ObtenerPorModalidad(@Param('modalidad', ParseBoolPipe) modalidad: boolean) {
    const pocos = await this.obtenerSsProgramasUseCase.ObtenerPorModalidad(modalidad);
    return SsProgramasPresenter.PresentarLista(pocos);
  }

  // ─── POST ────────────────────────────────────────────────────────────────

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.create')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo programa' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Programa creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o archivo no válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  @UseInterceptors(interceptorArchivos)
  async Crear(
    @Body() dto: CrearSsProgramaDto,
    @UploadedFiles(ValidarPdfPipe) files: ArchivosPrograma,
  ) {
    const poco = await this.crearSsProgramaUseCase.Ejecutar(dto, files);
    return SsProgramasPresenter.Presentar(poco);
  }

  // ─── PUT ─────────────────────────────────────────────────────────────────

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Permissions('programas.update')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar un programa' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number, description: 'ID del programa a actualizar' })
  @ApiResponse({ status: 200, description: 'Programa actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o archivo no válido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  @ApiResponse({ status: 404, description: 'Programa no encontrado' })
  @UseInterceptors(interceptorArchivos)
  async Actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarSsProgramaDto,
    @UploadedFiles(ValidarPdfPipe) files: ArchivosPrograma,
  ) {
    const poco = await this.actualizarSsProgramasUseCase.Ejecutar(id, dto, files);
    return SsProgramasPresenter.Presentar(poco);
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  @Roles('SUPER_ADMIN')
  @Permissions('programas.delete')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un programa' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del programa a eliminar' })
  @ApiResponse({ status: 200, description: 'Programa eliminado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permisos' })
  @ApiResponse({ status: 404, description: 'Programa no encontrado' })
  async Eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarSsProgramasUseCase.Ejecutar(id);
    return {
      statusCode: 200,
      message: `El programa con id ${id} fue eliminado correctamente.`,
    };
  }
}