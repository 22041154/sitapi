import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerResAsesorIntProyectosUseCase } from '../../logic/residencias_profesionales/Asesor Int Proyecto/obtener_res_asesor_int_proyecto.use.case';
import { CrearResAsesorIntProyectosUseCase } from '../../logic/residencias_profesionales/Asesor Int Proyecto/crear_asesor_int_proyecto.use.case';
import { ActualizarResAsesorIntProyectosUseCase } from '../../logic/residencias_profesionales/Asesor Int Proyecto/actualizar_res_asesor_int_proyecto.use.case';
import { EliminarResAsesorIntProyectosUseCase } from '../../logic/residencias_profesionales/Asesor Int Proyecto/eliminar_res_asesor_int_proyecto.use.case';
import { CrearResAsesorIntProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/res_asesor_int_proyecto.dto';
import { ActualizarResAsesorIntProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_asesor_int_proyectos/actualizar_res_asesor_int_proyecto.dto';
import { ResAsesorIntProyectosPresenter } from '../../presenters/residencias_profesionales/res_asesor_int_proyecto.presenter';

@ApiTags('Residencias Profesionales - Asesores Internos Proyectos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('residencias-profesionales/asesores-internos-proyectos')
export class ResAsesorIntProyectosController {

    constructor(
        private readonly obtenerResAsesorIntProyectosUseCase:
        ObtenerResAsesorIntProyectosUseCase,

        private readonly crearResAsesorIntProyectosUseCase:
        CrearResAsesorIntProyectosUseCase,

        private readonly actualizarResAsesorIntProyectosUseCase:
        ActualizarResAsesorIntProyectosUseCase,

        private readonly eliminarResAsesorIntProyectosUseCase:
        EliminarResAsesorIntProyectosUseCase,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las asignaciones de asesores internos' })
    @ApiResponse({ status: 200, description: 'Asignaciones obtenidas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No se encontraron asignaciones' })
    async ObtenerTodos() {

        const asignaciones =
            await this.obtenerResAsesorIntProyectosUseCase
                .ObtenerTodos();

        return ResAsesorIntProyectosPresenter
            .PresentarLista(asignaciones);

    }

    @Get('id/:id')
    @ApiOperation({ summary: 'Obtener asignación por id' })
    @ApiParam({ name: 'id', type: Number, description: 'Id de la asignación' })
    @ApiResponse({ status: 200, description: 'Asignación encontrada correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
    async ObtenerPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {

        const asignacion =
            await this.obtenerResAsesorIntProyectosUseCase
                .ObtenerPorId(id);

        return ResAsesorIntProyectosPresenter
            .Presentar(asignacion);

    }

    @Get('proyecto/:idProyecto')
    @ApiOperation({ summary: 'Obtener asignaciones por proyecto' })
    @ApiParam({ name: 'idProyecto', type: Number, description: 'Id del proyecto' })
    @ApiResponse({ status: 200, description: 'Asignaciones encontradas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No se encontraron asignaciones para el proyecto' })
    async ObtenerPorProyecto(
        @Param('idProyecto', ParseIntPipe) idProyecto: number,
    ) {

        const asignaciones =
            await this.obtenerResAsesorIntProyectosUseCase
                .ObtenerPorProyecto(idProyecto);

        return ResAsesorIntProyectosPresenter
            .PresentarLista(asignaciones);

    }

    @Get('personal-academico/:idPersonal')
    @ApiOperation({ summary: 'Obtener asignaciones por personal académico' })
    @ApiParam({ name: 'idPersonal', type: Number, description: 'Id del personal académico' })
    @ApiResponse({ status: 200, description: 'Asignaciones encontradas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No se encontraron asignaciones para el personal académico' })
    async ObtenerPorPersonalAcademico(
        @Param('idPersonal', ParseIntPipe) idPersonal: number,
    ) {

        const asignaciones =
            await this.obtenerResAsesorIntProyectosUseCase
                .ObtenerPorPersonalAcademico(idPersonal);

        return ResAsesorIntProyectosPresenter
            .PresentarLista(asignaciones);

    }

    @Get('asignacion/:idProyecto/:idPersonal')
    @ApiOperation({ summary: 'Obtener asignación específica' })
    @ApiParam({ name: 'idProyecto', type: Number, description: 'Id del proyecto' })
    @ApiParam({ name: 'idPersonal', type: Number, description: 'Id del personal académico' })
    @ApiResponse({ status: 200, description: 'Asignación encontrada correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
    async ObtenerAsignacion(
        @Param('idProyecto', ParseIntPipe) idProyecto: number,
        @Param('idPersonal', ParseIntPipe) idPersonal: number,
    ) {

        const asignacion =
            await this.obtenerResAsesorIntProyectosUseCase
                .ObtenerAsignacion(
                    idProyecto,
                    idPersonal,
                );

        return ResAsesorIntProyectosPresenter
            .Presentar(asignacion);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear asignación de asesor interno' })
    @ApiBody({ type: CrearResAsesorIntProyectoDto })
    @ApiResponse({ status: 201, description: 'Asignación creada correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 409, description: 'La asignación ya existe' })
    async Crear(
        @Body() dto: CrearResAsesorIntProyectoDto,
    ) {

        const asignacion =
            await this.crearResAsesorIntProyectosUseCase
                .Ejecutar(dto);

        return ResAsesorIntProyectosPresenter
            .Presentar(asignacion);

    }

    @Put('id/:id')
    @ApiOperation({ summary: 'Actualizar asignación de asesor interno' })
    @ApiParam({ name: 'id', type: Number, description: 'Id de la asignación' })
    @ApiBody({ type: ActualizarResAsesorIntProyectoDto })
    @ApiResponse({ status: 200, description: 'Asignación actualizada correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
    @ApiResponse({ status: 409, description: 'La asignación ya existe' })
    async Actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResAsesorIntProyectoDto,
    ) {

        const asignacion =
            await this.actualizarResAsesorIntProyectosUseCase
                .Ejecutar(
                    id,
                    dto,
                );

        return ResAsesorIntProyectosPresenter
            .Presentar(asignacion);

    }

    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar asignación de asesor interno' })
    @ApiParam({ name: 'id', type: Number, description: 'Id de la asignación' })
    @ApiResponse({ status: 204, description: 'Asignación eliminada correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
    async EliminarPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {

        await this.eliminarResAsesorIntProyectosUseCase
            .EliminarPorId(id);

    }

}