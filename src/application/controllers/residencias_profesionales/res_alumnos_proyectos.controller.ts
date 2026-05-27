import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';

import { ObtenerResAlumnosProyectosUseCase } from '../../logic/residencias_profesionales/Alumnos Proyectos/obtener_res_alumnos_proyectos.use.case';

import { CrearResAlumnosProyectosUseCase } from '../../logic/residencias_profesionales/Alumnos Proyectos/crear_res_alumnos_proyectos.use.case';

import { ActualizarResAlumnosProyectosUseCase } from '../../logic/residencias_profesionales/Alumnos Proyectos/actualizar_res_alumnos_proyectos.use.case';

import { EliminarResAlumnosProyectosUseCase } from '../../logic/residencias_profesionales/Alumnos Proyectos/eliminar_res_alumnos_proyectos.use.case';

import { CrearResAlumnoProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/crear_res_alumnos_proyectos.request';

import { ActualizarResAlumnoProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_alumnos_proyectos/actualizar_res_alumnos_proyectos.request';

import { ResAlumnosProyectosPresenter } from '../../presenters/residencias_profesionales/res_alumnos_proyectos.presenter';

@ApiTags('Residencias Profesionales - Alumnos Proyectos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('residencias-profesionales/alumnos-proyectos')
export class ResAlumnosProyectosController {

    constructor(
        private readonly obtenerUseCase:
        ObtenerResAlumnosProyectosUseCase,

        private readonly crearUseCase:
        CrearResAlumnosProyectosUseCase,

        private readonly actualizarUseCase:
        ActualizarResAlumnosProyectosUseCase,

        private readonly eliminarUseCase:
        EliminarResAlumnosProyectosUseCase,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Obtener todos los registros',
    })
    @ApiResponse({
        status: 200,
        description: 'Registros obtenidos correctamente',
    })
    @ApiResponse({
        status: 401,
        description: 'No autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
    })
    async ObtenerTodos() {

        const registros =
            await this.obtenerUseCase.ObtenerTodos();

        return ResAlumnosProyectosPresenter
            .PresentarLista(registros);

    }

    @Get('id/:id')
    @ApiOperation({
        summary: 'Obtener registro por id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'ID del registro',
    })
    @ApiResponse({
        status: 200,
        description: 'Registro obtenido correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Registro no encontrado',
    })
    async ObtenerPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {

        const registro =
            await this.obtenerUseCase.ObtenerPorId(id);

        return ResAlumnosProyectosPresenter
            .Presentar(registro);

    }

    @Get('proyecto/:idProyecto')
    @ApiOperation({
        summary: 'Obtener registros por proyecto',
    })
    @ApiParam({
        name: 'idProyecto',
        type: Number,
        description: 'ID del proyecto',
    })
    @ApiResponse({
        status: 200,
        description: 'Registros obtenidos correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
    })
    async ObtenerPorProyecto(
        @Param('idProyecto', ParseIntPipe)
        idProyecto: number,
    ) {

        const registros =
            await this.obtenerUseCase
                .ObtenerPorProyecto(idProyecto);

        return ResAlumnosProyectosPresenter
            .PresentarLista(registros);

    }

    @Get('alumno/:idAlumnoAcademico')
    @ApiOperation({
        summary: 'Obtener registros por alumno',
    })
    @ApiParam({
        name: 'idAlumnoAcademico',
        type: Number,
        description: 'ID del alumno académico',
    })
    @ApiResponse({
        status: 200,
        description: 'Registros obtenidos correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
    })
    async ObtenerPorAlumno(
        @Param('idAlumnoAcademico', ParseIntPipe)
        idAlumnoAcademico: number,
    ) {

        const registros =
            await this.obtenerUseCase
                .ObtenerPorAlumno(idAlumnoAcademico);

        return ResAlumnosProyectosPresenter
            .PresentarLista(registros);

    }

    @Get('asesor-interno/:idAsesorInterno')
    @ApiOperation({
        summary: 'Obtener registros por asesor interno',
    })
    @ApiParam({
        name: 'idAsesorInterno',
        type: Number,
        description: 'ID del asesor interno',
    })
    @ApiResponse({
        status: 200,
        description: 'Registros obtenidos correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
    })
    async ObtenerPorAsesorInterno(
        @Param('idAsesorInterno', ParseIntPipe)
        idAsesorInterno: number,
    ) {

        const registros =
            await this.obtenerUseCase
                .ObtenerPorAsesorInterno(idAsesorInterno);

        return ResAlumnosProyectosPresenter
            .PresentarLista(registros);

    }

    @Get('dictamen/:idCatalogoDictamen')
    @ApiOperation({
        summary: 'Obtener registros por dictamen',
    })
    @ApiParam({
        name: 'idCatalogoDictamen',
        type: Number,
        description: 'ID del catálogo dictamen',
    })
    @ApiResponse({
        status: 200,
        description: 'Registros obtenidos correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
    })
    async ObtenerPorDictamen(
        @Param('idCatalogoDictamen', ParseIntPipe)
        idCatalogoDictamen: number,
    ) {

        const registros =
            await this.obtenerUseCase
                .ObtenerPorDictamen(idCatalogoDictamen);

        return ResAlumnosProyectosPresenter
            .PresentarLista(registros);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Crear nuevo registro',
    })
    @ApiBody({
        type: CrearResAlumnoProyectoDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Registro creado correctamente',
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos',
    })
    @ApiResponse({
        status: 409,
        description: 'El alumno ya está asignado al proyecto',
    })
    async Crear(
        @Body() dto: CrearResAlumnoProyectoDto,
    ) {

        const registro =
            await this.crearUseCase.Ejecutar(dto);

        return ResAlumnosProyectosPresenter
            .Presentar(registro);

    }

    @Put('id/:id')
    @ApiOperation({
        summary: 'Actualizar registro completo (PUT)',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'ID del registro',
    })
    @ApiBody({
        type: ActualizarResAlumnoProyectoDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Registro actualizado correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Registro no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'Conflicto de información',
    })
    async ActualizarPut(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResAlumnoProyectoDto,
    ) {

        const registro =
            await this.actualizarUseCase
                .Ejecutar(id, dto);

        return ResAlumnosProyectosPresenter
            .Presentar(registro);

    }

    @Patch('id/:id')
    @ApiOperation({
        summary: 'Actualizar registro parcial (PATCH)',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'ID del registro',
    })
    @ApiBody({
        type: ActualizarResAlumnoProyectoDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Registro actualizado correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Registro no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'Conflicto de información',
    })
    async ActualizarPatch(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResAlumnoProyectoDto,
    ) {

        const registro =
            await this.actualizarUseCase
                .Ejecutar(id, dto);

        return ResAlumnosProyectosPresenter
            .Presentar(registro);

    }

    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Eliminar registro',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'ID del registro',
    })
    @ApiResponse({
        status: 204,
        description: 'Registro eliminado correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Registro no encontrado',
    })
    async Eliminar(
        @Param('id', ParseIntPipe) id: number,
    ) {

        await this.eliminarUseCase.Ejecutar(id);

    }

}