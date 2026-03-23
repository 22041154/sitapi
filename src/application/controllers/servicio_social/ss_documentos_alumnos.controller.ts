import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsDocumentosAlumnos } from '../../logic/servicio_Social/DocumentosAlumnos/obtener_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/crear_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';
import { Response } from 'express';
import { EliminarSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/eliminar_ss_documentos_alumnos';

@ApiTags('Servicio Social - Documentos Alumnos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/documentos-alumnos')
export class SsDocumentosAlumnosController {
  constructor(
    private readonly obtenerSsDocumentosAlumnosUseCase: ObtenerSsDocumentosAlumnos,
    private readonly crearSsDocumentosAlumnosUseCase: CrearSsDocumentosAlumnosUseCase,
    private readonly eliminarSsDocumentosAlumnosUseCase: EliminarSsDocumentosAlumnosUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de documentos' })
  @ApiResponse({ status: 200, description: 'Registros obtenidos correctamente' })
  async ObtenerTodos() {
    return this.obtenerSsDocumentosAlumnosUseCase.ObtenerTodos();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Obtener documentos por id del registro' })
  @ApiParam({ name: 'id', type: Number, description: 'Id del registro de documentos' })
  async ObtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorId(id);
  }

  @Get('alumno/:id_alumno')
  @ApiOperation({ summary: 'Obtener documentos por ID de alumno' })
  @ApiParam({ name: 'id_alumno', type: Number, description: 'ID del alumno académico' })
  async ObtenerPorIdAlumnoAcademico(@Param('id_alumno', ParseIntPipe) id_alumno: number) {
    return this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorIdAlumnoAcademico(id_alumno);
  }

  @Get('plan-trabajo/:id_plan_trabajo')
  @ApiOperation({ summary: 'Obtener documentos por ID de plan de trabajo' })
  @ApiParam({ name: 'id_plan_trabajo', type: Number, description: 'ID del plan de trabajo' })
  async ObtenerPorIdPlanTrabajo(@Param('id_plan_trabajo', ParseIntPipe) id_plan_trabajo: number) {
    return this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorIdPlanTrabajo(id_plan_trabajo);
  }

  @Get('ver-carta-presentacion/:id')
  @ApiOperation({ summary: 'Ver el PDF de la carta de presentación' })
  async VerCartaPresentacion(
    @Param('id', ParseIntPipe) id: number, 
    @Res() res: Response
  ) {
    const registro = await this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorId(id);
    
    if (!registro || !registro.carta_presentacion) {
      return res.status(404).send('No se encontró el documento o no se ha subido la carta');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="carta_presentacion.pdf"',
    });

    res.send(registro.carta_presentacion);
  }

  @Get('ver-carta-compromiso/:id')
  @ApiOperation({ summary: 'Ver el PDF de la carta compromiso' })
  async VerCartaCompromiso(
    @Param('id', ParseIntPipe) id: number, 
    @Res() res: Response
  ) {
    const registro = await this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorId(id);
    
    if (!registro || !registro.carta_compromiso) {
      return res.status(404).send('No se encontró el documento o no se ha subido la carta compromiso');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="carta_compromiso.pdf"',
    });

    res.send(registro.carta_compromiso);
  }

  @Get('ver-carta-aceptacion/:id')
  @ApiOperation({ summary: 'Ver el PDF de la carta de aceptación' })
  async VerCartaAceptacion(
    @Param('id', ParseIntPipe) id: number, 
    @Res() res: Response
  ) {
    const registro = await this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorId(id);
    
    if (!registro || !registro.carta_aceptacion) {
      return res.status(404).send('No se encontró el documento o no se ha subido la carta de aceptación');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="carta_aceptacion.pdf"',
    });

    res.send(registro.carta_aceptacion);
  }

  @Get('ver-seguro-facultativo/:id')
  @ApiOperation({ summary: 'Ver el PDF del seguro facultativo' })
  async VerSeguroFacultativo(
    @Param('id', ParseIntPipe) id: number, 
    @Res() res: Response
  ) {
    const registro = await this.obtenerSsDocumentosAlumnosUseCase.ObtenerPorId(id);
    
    if (!registro || !registro.seguro_facultativo) {
      return res.status(404).send('No se encontró el documento o no se ha subido el seguro facultativo');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="seguro_facultativo.pdf"',
    });

    res.send(registro.seguro_facultativo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Subir documentos de un alumno' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'carta_presentacion', maxCount: 1 },
    { name: 'carta_compromiso', maxCount: 1 },
    { name: 'carta_aceptacion', maxCount: 1 },
    { name: 'seguro_facultativo', maxCount: 1 },
  ]))
  async Crear(
    @Body() dto: CrearSsDocumentosAlumnosDto,
    @UploadedFiles() files: { 
      carta_presentacion?: Express.Multer.File[], 
      carta_compromiso?: Express.Multer.File[],
      carta_aceptacion?: Express.Multer.File[],
      seguro_facultativo?: Express.Multer.File[]
    }
  ) {
    return this.crearSsDocumentosAlumnosUseCase.Ejecutar(dto, files);
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar un registro de documentos por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del registro a eliminar' })
  @ApiResponse({ status: 200, description: 'Registro eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  async Eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarSsDocumentosAlumnosUseCase.Ejecutar(id);
    return { 
      statusCode: 200,
      message: `El registro de documentos con id ${id} fue eliminado correctamente.` 
    };
  }
}
