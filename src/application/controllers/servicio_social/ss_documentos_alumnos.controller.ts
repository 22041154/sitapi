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
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';
import { PermissionsGuard } from '../../../infrastructure/security/auth/permisions.guard';

import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';
import { Permissions } from '../../../infrastructure/security/auth/decorators/permisions.decorator';

import { ObtenerSsDocumentosAlumnos } from '../../logic/servicio_Social/DocumentosAlumnos/obtener_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/crear_ss_documentos_alumnos';
import { EliminarSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/eliminar_ss_documentos_alumnos';
import { ActualizarSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.use.case';

import { CrearSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';
import { ActualizarSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/actualizar_ss_documentos_alumnos.dto';

import { SsDocumentosAlumnosPresenter } from '../../presenters/servicio_social/ss_documentos_alumnos.presenter';

import { UsuarioActual } from '../../../infrastructure/security/auth/decorators/usuario_actual.decorator';
import { JwtPayload } from '../../../infrastructure/security/auth/intefraces/jwt_payload.interface';

import { FiltroPdf } from '../../../infrastructure/security/filters/archivo_pdf.filter';
import { ValidarPdfPipe } from '../../../infrastructure/security/pipes/validar_pdf.pipe';

const storage = memoryStorage();

const interceptorArchivos = FileFieldsInterceptor(
  [
    { name: 'carta_presentacion', maxCount: 1 },
    { name: 'carta_compromiso', maxCount: 1 },
    { name: 'carta_aceptacion', maxCount: 1 },
    { name: 'seguro_facultativo', maxCount: 1 },
  ],
  {
    storage,
    fileFilter: FiltroPdf,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  },
);

type ArchivosDocumentos = {
  carta_presentacion?: Express.Multer.File[];
  carta_compromiso?: Express.Multer.File[];
  carta_aceptacion?: Express.Multer.File[];
  seguro_facultativo?: Express.Multer.File[];
};

@ApiTags('Servicio Social - Documentos Alumnos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard, PermissionsGuard)
@Controller('servicio-social/documentos-alumnos')
export class SsDocumentosAlumnosController {
  constructor(
    private readonly obtenerUseCase: ObtenerSsDocumentosAlumnos,
    private readonly crearUseCase: CrearSsDocumentosAlumnosUseCase,
    private readonly eliminarUseCase: EliminarSsDocumentosAlumnosUseCase,
    private readonly actualizarUseCase: ActualizarSsDocumentosAlumnosUseCase,
  ) {}

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Permissions('documentos.read')
  @Get()
  async ObtenerTodos() {
    const data = await this.obtenerUseCase.ObtenerTodos();
    return SsDocumentosAlumnosPresenter.PresentarLista(data);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('documentos.read')
  @Get('id/:id')
  async ObtenerPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.obtenerUseCase.ObtenerPorId(id);
    return SsDocumentosAlumnosPresenter.Presentar(data);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('documentos.read')
  @Get('alumno/:id_alumno')
  async ObtenerPorAlumno(
    @Param('id_alumno', ParseIntPipe) id_alumno: number,
  ) {
    const data =
      await this.obtenerUseCase.ObtenerPorIdAlumnoAcademico(
        id_alumno,
      );

    return SsDocumentosAlumnosPresenter.PresentarLista(data);
  }

  @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
  @Permissions('documentos.read')
  @Get('plan-trabajo/:id_plan_trabajo')
  async ObtenerPorPlan(
    @Param('id_plan_trabajo', ParseIntPipe)
    id_plan_trabajo: number,
  ) {
    const data =
      await this.obtenerUseCase.ObtenerPorIdPlanTrabajo(
        id_plan_trabajo,
      );

    return SsDocumentosAlumnosPresenter.PresentarLista(data);
  }

  @Roles('ALUMNO')
  @Permissions('documentos.create')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(interceptorArchivos)
  async Crear(
    @UsuarioActual() usuario: JwtPayload,
    @Body() dto: CrearSsDocumentosAlumnosDto,
    @UploadedFiles(ValidarPdfPipe)
    files: ArchivosDocumentos,
  ) {
    dto.id_alumno_academico =
      String(usuario.idAlumnoAcademico);

    const data =
      await this.crearUseCase.Ejecutar(
        dto,
        files,
      );

    return SsDocumentosAlumnosPresenter.Presentar(data);
  }

  @Roles('ALUMNO')
  @Permissions('documentos.update')
  @Put('id/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(interceptorArchivos)
  async Actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarSsDocumentosAlumnosDto,
    @UploadedFiles(ValidarPdfPipe)
    files: ArchivosDocumentos,
    @UsuarioActual() usuario: JwtPayload,
  ) {
    const data =
      await this.actualizarUseCase.Ejecutar(
        id,
        dto,
        files,
        usuario.idAlumnoAcademico,
      );

    return SsDocumentosAlumnosPresenter.Presentar(data);
  }

  @Roles('SUPER_ADMIN')
  @Permissions('documentos.delete')
  @Delete('id/:id')
  async Eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.eliminarUseCase.Ejecutar(id);

    return {
      statusCode: 200,
      message: `Registro ${id} eliminado correctamente`,
    };
  }
}