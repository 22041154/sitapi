import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/obtener_res_proyectos.use.case';
import { CrearResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/crear_res_proyectos.use.case';
import { ActualizarResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/actualizar_res_empresas.use.case';
import { EliminarResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/eliminar_res_proyectos.use.case';
import { CrearResProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';
import { ActualizarResProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_proyectos/actualizar_res_proyecto.dto';
import { ResProyectosPresenter } from '../../presenters/residencias_profesionales/res_proyectos.presenter';

@ApiTags('Residencias Profesionales - Proyectos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('residencias-profesionales/proyectos')
export class ResProyectosController {

    constructor(
        private readonly obtenerResProyectosUseCase: ObtenerResProyectosUseCase,
        private readonly crearResProyectosUseCase: CrearResProyectosUseCase,
        private readonly actualizarResProyectosUseCase: ActualizarResProyectosUseCase,
        private readonly eliminarResProyectosUseCase: EliminarResProyectosUseCase,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los proyectos' })
    @ApiResponse({ status: 200, description: 'Lista de proyectos obtenida correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos' })
    async ObtenerTodos() {

        const proyectos =
            await this.obtenerResProyectosUseCase.ObtenerTodos();

        return ResProyectosPresenter.PresentarLista(
            proyectos,
        );

    }

    @Get('id/:id')
    @ApiOperation({ summary: 'Obtener proyecto por id' })
    @ApiParam({ name: 'id', type: Number, description: 'Id del proyecto' })
    @ApiResponse({ status: 200, description: 'Proyecto encontrado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async ObtenerPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {

        const proyecto =
            await this.obtenerResProyectosUseCase.ObtenerPorId(id);

        return ResProyectosPresenter.Presentar(
            proyecto,
        );

    }

    @Get('empresa/:idEmpresa')
    @ApiOperation({ summary: 'Obtener proyectos por empresa' })
    @ApiParam({ name: 'idEmpresa', type: Number, description: 'Id de la empresa' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos para la empresa' })
    async ObtenerPorEmpresa(
        @Param('idEmpresa', ParseIntPipe) idEmpresa: number,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase.ObtenerPorEmpresa(
                idEmpresa,
            );

        return ResProyectosPresenter.PresentarLista(
            proyectos,
        );

    }

    @Get('carrera/:idCarrera')
    @ApiOperation({ summary: 'Obtener proyectos por carrera' })
    @ApiParam({ name: 'idCarrera', type: Number, description: 'Id de la carrera' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos para la carrera' })
    async ObtenerPorCarrera(
        @Param('idCarrera', ParseIntPipe) idCarrera: number,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase.ObtenerPorCarrera(
                idCarrera,
            );

        return ResProyectosPresenter.PresentarLista(
            proyectos,
        );

    }

    @Get('asesor-externo/:asesorExterno')
    @ApiOperation({ summary: 'Obtener proyectos por asesor externo' })
    @ApiParam({ name: 'asesorExterno', type: String, description: 'Nombre del asesor externo' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos para el asesor externo' })
    async ObtenerPorAsesorExterno(
        @Param('asesorExterno') asesorExterno: string,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase.ObtenerPorAsesorExterno(
                asesorExterno,
            );

        return ResProyectosPresenter.PresentarLista(
            proyectos,
        );

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear un nuevo proyecto' })
    @ApiBody({ type: CrearResProyectoDto })
    @ApiResponse({ status: 201, description: 'Proyecto creado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 409, description: 'Ya existe un proyecto similar' })
    async Crear(
        @Body() dto: CrearResProyectoDto,
    ) {

        const proyecto =
            await this.crearResProyectosUseCase.Ejecutar(dto);

        return ResProyectosPresenter.Presentar(
            proyecto,
        );

    }

    @Put('id/:id')
    @ApiOperation({ summary: 'Actualizar proyecto' })
    @ApiParam({ name: 'id', type: Number, description: 'Id del proyecto' })
    @ApiBody({ type: ActualizarResProyectoDto })
    @ApiResponse({ status: 200, description: 'Proyecto actualizado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    @ApiResponse({ status: 409, description: 'Ya existe un proyecto similar' })
    async Actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResProyectoDto,
    ) {

        const proyecto =
            await this.actualizarResProyectosUseCase.Ejecutar(
                id,
                dto,
            );

        return ResProyectosPresenter.Presentar(
            proyecto,
        );

    }

    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar proyecto por id' })
    @ApiParam({ name: 'id', type: Number, description: 'Id del proyecto' })
    @ApiResponse({ status: 204, description: 'Proyecto eliminado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async EliminarPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {

        await this.eliminarResProyectosUseCase.EliminarPorId(id);

    }

}