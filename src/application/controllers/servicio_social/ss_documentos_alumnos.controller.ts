import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';
import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';

import { ObtenerSsDocumentosAlumnos } from '../../logic/servicio_Social/DocumentosAlumnos/obtener_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/crear_ss_documentos_alumnos';
import { EliminarSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/eliminar_ss_documentos_alumnos';
import { ActualizarSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.use.case';

import { CrearSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';
import { ActualizarSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.dto';
import { SsDocumentosAlumnosPresenter } from '../../presenters/servicio_social/ss_documentos_alumnos.presenter';

// Agrega estos imports
import { UsuarioActual } from '../../../infrastructure/security/auth/decorators/usuario_actual.decorator';
import { JwtPayload } from '../../../infrastructure/security/auth/intefraces/jwt_payload.interface';

// Configuración de Multer: archivos en memoria, sin tocar el disco
const memoriaStorage = memoryStorage();
const interceptorArchivos = FileFieldsInterceptor(
  [
    { name: 'carta_presentacion',  maxCount: 1 },
    { name: 'carta_compromiso',    maxCount: 1 },
    { name: 'carta_aceptacion',    maxCount: 1 },
    { name: 'seguro_facultativo',  maxCount: 1 },
  ],
  { storage: memoriaStorage },
);

type ArchivosDocumentos = {
  carta_presentacion?: Express.Multer.File[];
  carta_compromiso?:   Express.Multer.File[];
  carta_aceptacion?:   Express.Multer.File[];
  seguro_facultativo?: Express.Multer.File[];
};

@ApiTags('Servicio Social - Documentos Alumnos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard)
@Controller('servicio-social/documentos-alumnos')
export class SsDocumentosAlumnosController {
  constructor(
    private readonly obtenerSsDocumentosAlumnosUseCase: ObtenerSsDocumentosAlumnos,
    private readonly crearSsDocumentosAlumnosUseCase: CrearSsDocumentosAlumnosUseCase,
    private readonly eliminarSsDocumentosAlumnosUseCase: EliminarSsDocumentosAlumnosUseCase,
    private readonly actualizarSsDocumentosAlumnosUseCase: ActualizarSsDocumentosAlumnosUseCase,
  ) {}

  // ─── GET ─────────────────────────────────────────────────────────────────

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de documentos' })
  @ApiResponse({ status: 200, description: 'Registros obtenidos correctamente' })
  async ObtenerTodos() {
    const pocos = await this.obtenerSsDocumentosAlumnosUseCase.ObtenerTodos();
    return SsDocumentosAlumnosPresenter.PresentarLista(pocos);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener documentos por id del registro' })
  @ApiParam({ name: 'id', type: Number, description: 'Id del registro de documentos' })
  async ObtenerPorId(@Param('id', ParseIntPipe) id: number) {
    const poco = await this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorId(id);
    return SsDocumentosAlumnosPresenter.Presentar(poco);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('alumno/:id_alumno')
  @ApiOperation({ summary: 'Obtener documentos por ID de alumno' })
  @ApiParam({ name: 'id_alumno', type: Number, description: 'ID del alumno académico' })
  async ObtenerPorIdAlumnoAcademico(
    @Param('id_alumno', ParseIntPipe) id_alumno: number,
  ) {
    const pocos = await this.obtenerSsDocumentosAlumnosUseCase
      .ObtenerPorIdAlumnoAcademico(id_alumno);
    return SsDocumentosAlumnosPresenter.PresentarLista(pocos);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Get('plan-trabajo/:id_plan_trabajo')
  @ApiOperation({ summary: 'Obtener documentos por ID de plan de trabajo' })
  @ApiParam({ name: 'id_plan_trabajo', type: Number, description: 'ID del plan de trabajo' })
  async ObtenerPorIdPlanTrabajo(
    @Param('id_plan_trabajo', ParseIntPipe) id_plan_trabajo: number,
  ) {
    const pocos = await this.obtenerSsDocumentosAlumnosUseCase
      .ObtenerPorIdPlanTrabajo(id_plan_trabajo);
    return SsDocumentosAlumnosPresenter.PresentarLista(pocos);
  }

  // ─── POST ────────────────────────────────────────────────────────────────

  @Roles('ALUMNO')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Subir documentos de un alumno' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(interceptorArchivos)
  async Crear(
    @UsuarioActual() usuario: JwtPayload,   // ← toma el usuario del token
    @Body() dto: CrearSsDocumentosAlumnosDto,
    @UploadedFiles() files: ArchivosDocumentos,
  ) {
    // Inyecta el id del alumno desde el token al DTO
    dto.id_alumno_academico = String(usuario.idAlumnoAcademico);
    const poco = await this.crearSsDocumentosAlumnosUseCase.Ejecutar(dto, files);
    return SsDocumentosAlumnosPresenter.Presentar(poco);
  }

  // ─── PUT ─────────────────────────────────────────────────────────────────

  @Roles('ALUMNO')
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar documentos de un alumno' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number, description: 'ID del registro a actualizar' })
  @ApiResponse({ status: 200, description: 'Documentos actualizados correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  @UseInterceptors(interceptorArchivos)
  async Actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarSsDocumentosAlumnosDto,
    @UploadedFiles() files: ArchivosDocumentos,
    @UsuarioActual() usuario: JwtPayload,  
  ) {
    const poco = await this.actualizarSsDocumentosAlumnosUseCase.Ejecutar(
      id,
      dto,
      files,
      usuario.idAlumnoAcademico,  
    );
    return SsDocumentosAlumnosPresenter.Presentar(poco);
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  @Roles('SUPER_ADMIN')
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un registro de documentos por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del registro a eliminar' })
  @ApiResponse({ status: 200, description: 'Registro eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  async Eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarSsDocumentosAlumnosUseCase.Ejecutar(id);
    return {
      statusCode: 200,
      message: `El registro de documentos con id ${id} fue eliminado correctamente.`,
    };
  }
}