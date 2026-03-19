import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles, HttpCode, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsDocumentosAlumnos } from '../../logic/servicio_Social/DocumentosAlumnos/obtener_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosUseCase } from '../../logic/servicio_Social/DocumentosAlumnos/crear_ss_documentos_alumnos';
import { CrearSsDocumentosAlumnosDto } from '../../../dtos/requests/Servicio Social/DocumentosAlumnos/crear_ss_documentos_alumnos.dto';

@ApiTags('Servicio Social - Documentos Alumnos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('servicio-social/documentos-alumnos')
export class SsDocumentosAlumnosController {
  constructor(
    private readonly obtenerSsDocumentosAlumnosUseCase: ObtenerSsDocumentosAlumnos,
    private readonly crearSsDocumentosAlumnosUseCase: CrearSsDocumentosAlumnosUseCase, // Inyectamos el caso de uso del POST
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


  // --- NUEVO MÉTODO POST ---
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
}