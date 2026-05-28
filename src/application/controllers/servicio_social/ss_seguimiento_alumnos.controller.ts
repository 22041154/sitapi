import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';

import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';

import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';

import { ObtenerSsSeguimientoAlumnos } from '../../logic/servicio_Social/SeguimientoAlumnos/obtener_ss_seguimiento_alumnos';

import { CrearSsSeguimientoAlumnosDto } from '../../../dtos/requests/Servicio Social/SeguimientoAlumnos/crear_ss_seguimiento_alumnos.dto';

import { CrearSsSeguimientoAlumnosUseCase } from '../../logic/servicio_Social/SeguimientoAlumnos/crear_ss_seguimiento_alumnos';

import { EliminarSsSeguimientoAlumnosUseCase } from '../../logic/servicio_Social/SeguimientoAlumnos/eliminar_ss_seguimiento_alumnos';

@ApiTags('Servicio Social - Seguimiento Alumnos')

@ApiBearerAuth('access-token')

@UseGuards(
  JwtGuard,
  RolesGuard,
)

@Controller('servicio-social/seguimiento-alumnos')

export class SsSeguimientoAlumnosController {

  constructor(
    private readonly obtenerSsSeguimientoAlumnosUseCase: ObtenerSsSeguimientoAlumnos,

    private readonly crearSsSeguimientoAlumnosUseCase: CrearSsSeguimientoAlumnosUseCase,

    private readonly eliminarSsSeguimientoAlumnosUseCase: EliminarSsSeguimientoAlumnosUseCase,
  ) {}

  /*
    SOLO ADMIN Y SUPER ADMIN
  */
  @Roles(
    'ADMIN',
    'SUPER_ADMIN',
  )

  @Get()

  @ApiOperation({
    summary: 'Obtener todos los seguimientos de alumnos',
  })

  @ApiResponse({
    status: 200,
    description: 'Lista obtenida correctamente',
  })

  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })

  @ApiResponse({
    status: 403,
    description: 'No tiene permisos',
  })

  @ApiResponse({
    status: 404,
    description: 'No se encontraron seguimientos',
  })

  async ObtenerTodos() {
    return this.obtenerSsSeguimientoAlumnosUseCase
      .ObtenerTodos();
  }

  /*
    TODOS LOS ROLES
    (el alumno solo debe consultar los suyos;
    esa validación se hará después)
  */
  @Roles(
    'ALUMNO',
    'ADMIN',
    'SUPER_ADMIN',
  )

  @Get('id/:id')

  @ApiOperation({
    summary: 'Obtener seguimiento por id',
  })

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id del seguimiento',
  })

  @ApiResponse({
    status: 200,
    description: 'Seguimiento encontrado correctamente',
  })

  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })

  @ApiResponse({
    status: 403,
    description: 'No tiene permisos',
  })

  @ApiResponse({
    status: 404,
    description: 'Seguimiento no encontrado',
  })

  async ObtenerPorId(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.obtenerSsSeguimientoAlumnosUseCase
      .ObtenerPorId(id);
  }

  /*
    TODOS LOS ROLES
    (el alumno solo debe consultar sus seguimientos;
    esa validación se hará después)
  */
  @Roles(
    'ALUMNO',
    'ADMIN',
    'SUPER_ADMIN',
  )

  @Get('alumno/:id_alumno')

  @ApiOperation({
    summary: 'Obtener seguimientos por ID de alumno académico',
  })

  @ApiParam({
    name: 'id_alumno',
    type: Number,
    description: 'ID del alumno académico',
  })

  @ApiResponse({
    status: 200,
    description: 'Seguimientos encontrados correctamente',
  })

  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })

  @ApiResponse({
    status: 403,
    description: 'No tiene permisos',
  })

  @ApiResponse({
    status: 404,
    description: 'No se encontraron seguimientos para el alumno',
  })

  async ObtenerPorIdAlumnoAcademico(
    @Param('id_alumno', ParseIntPipe)
    id_alumno: number,
  ) {
    return this.obtenerSsSeguimientoAlumnosUseCase
      .ObtenerPorIdAlumnoAcademico(id_alumno);
  }

  /*
    SOLO ADMIN Y SUPER ADMIN
  */
  @Roles(
    'ADMIN',
    'SUPER_ADMIN',
  )

  @Get('programa/:id_programa')

  @ApiOperation({
    summary: 'Obtener seguimientos por ID de programa',
  })

  @ApiParam({
    name: 'id_programa',
    type: Number,
    description: 'ID del programa',
  })

  @ApiResponse({
    status: 200,
    description: 'Seguimientos encontrados correctamente',
  })

  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })

  @ApiResponse({
    status: 403,
    description: 'No tiene permisos',
  })

  @ApiResponse({
    status: 404,
    description: 'No se encontraron seguimientos para el programa',
  })

  async ObtenerPorIdPrograma(
    @Param('id_programa', ParseIntPipe)
    id_programa: number,
  ) {
    return this.obtenerSsSeguimientoAlumnosUseCase
      .ObtenerPorIdPrograma(id_programa);
  }

  /*
    TODOS LOS ROLES
  */
  @Roles(
    'ALUMNO',
    'ADMIN',
    'SUPER_ADMIN',
  )

  @Post()

  @HttpCode(HttpStatus.CREATED)

  @ApiOperation({
    summary: 'Crear un nuevo seguimiento de alumno',
  })

  @ApiBody({
    type: CrearSsSeguimientoAlumnosDto,
  })

  @ApiResponse({
    status: 201,
    description: 'Seguimiento creado correctamente',
  })

  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })

  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })

  @ApiResponse({
    status: 403,
    description: 'No tiene permisos',
  })

  async Crear(
    @Body()
    dto: CrearSsSeguimientoAlumnosDto,
  ) {
    return this.crearSsSeguimientoAlumnosUseCase
      .Ejecutar(dto);
  }

  /*
    SOLO SUPER ADMIN
  */
  @Roles(
    'SUPER_ADMIN',
  )

  @Delete('id/:id')

  @ApiOperation({
    summary: 'Eliminar un seguimiento de alumno',
  })

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id del seguimiento',
  })

  @ApiResponse({
    status: 200,
    description: 'Seguimiento eliminado correctamente',
  })

  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })

  @ApiResponse({
    status: 403,
    description: 'No tiene permisos',
  })

  @ApiResponse({
    status: 404,
    description: 'Seguimiento no encontrado',
  })

  async Eliminar(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.eliminarSsSeguimientoAlumnosUseCase
      .Ejecutar(id);
  }
}