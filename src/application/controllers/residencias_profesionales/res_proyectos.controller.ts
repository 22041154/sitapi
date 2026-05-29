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
import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';
import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';

import { ObtenerResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/obtener_res_proyectos.use.case';
import { CrearResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/crear_res_proyectos.use.case';
import { ActualizarResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/actualizar_res_empresas.use.case';
import { EliminarResProyectosUseCase } from '../../logic/residencias_profesionales/Proyectos/eliminar_res_proyectos.use.case';

import { CrearResProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_proyectos/crear_res_proyecto.dto';
import { ActualizarResProyectoDto } from '../../../dtos/requests/Residencias Profesionales/res_proyectos/actualizar_res_proyecto.dto';

import { ResProyectosPresenter } from '../../presenters/residencias_profesionales/res_proyectos.presenter';

@ApiTags('Residencias Profesionales - Proyectos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard)
@Controller('residencias-profesionales/proyectos')
export class ResProyectosController {

    constructor(
        private readonly obtenerResProyectosUseCase: ObtenerResProyectosUseCase,
        private readonly crearResProyectosUseCase: CrearResProyectosUseCase,
        private readonly actualizarResProyectosUseCase: ActualizarResProyectosUseCase,
        private readonly eliminarResProyectosUseCase: EliminarResProyectosUseCase,
    ) {}

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN) - VER
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get()
    @ApiOperation({ summary: 'Obtener todos los proyectos' })
    @ApiResponse({ status: 200, description: 'Lista de proyectos obtenida correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos' })
    async ObtenerTodos() {
        const proyectos = await this.obtenerResProyectosUseCase.ObtenerTodos();
        return ResProyectosPresenter.PresentarLista(proyectos);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN) - VER
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('id/:id')
    @ApiOperation({ summary: 'Obtener proyecto por id' })
    @ApiParam({ name: 'id', type: Number, description: 'Id del proyecto' })
    @ApiResponse({ status: 200, description: 'Proyecto encontrado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async ObtenerPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {
        const proyecto = await this.obtenerResProyectosUseCase.ObtenerPorId(id);
        return ResProyectosPresenter.Presentar(proyecto);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN) - VER
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('empresa/:idEmpresa')
    @ApiOperation({ summary: 'Obtener proyectos por empresa' })
    @ApiParam({ name: 'idEmpresa', type: Number, description: 'Id de la empresa' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos para esta empresa' })
    async ObtenerPorEmpresa(
        @Param('idEmpresa', ParseIntPipe) idEmpresa: number,
    ) {
        const proyectos = await this.obtenerResProyectosUseCase.ObtenerPorEmpresa(idEmpresa);
        return ResProyectosPresenter.PresentarLista(proyectos);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN) - VER
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('folio/:folio')
    @ApiOperation({ summary: 'Obtener proyectos por folio' })
    @ApiParam({ name: 'folio', type: String, description: 'Folio del proyecto' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos con ese folio' })
    async ObtenerPorFolio(
        @Param('folio') folio: string,
    ) {
        const proyectos = await this.obtenerResProyectosUseCase.ObtenerPorFolio(folio);
        return ResProyectosPresenter.PresentarLista(proyectos);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN) - VER
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('nombre/:nombre')
    @ApiOperation({ summary: 'Obtener proyectos por nombre' })
    @ApiParam({ name: 'nombre', type: String, description: 'Nombre del proyecto' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos con ese nombre' })
    async ObtenerPorNombre(
        @Param('nombre') nombre: string,
    ) {
        const proyectos = await this.obtenerResProyectosUseCase.ObtenerPorNombre(nombre);
        return ResProyectosPresenter.PresentarLista(proyectos);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN) - VER
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('asesor/:nombreAsesor')
    @ApiOperation({ summary: 'Obtener proyectos por asesor externo' })
    @ApiParam({ name: 'nombreAsesor', type: String, description: 'Nombre del asesor externo' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos para este asesor' })
    async ObtenerPorAsesor(
        @Param('nombreAsesor') nombreAsesor: string,
    ) {
        const proyectos = await this.obtenerResProyectosUseCase.ObtenerPorNombreAsesorExterno(nombreAsesor);
        return ResProyectosPresenter.PresentarLista(proyectos);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN) - VER
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('area/:idClaveArea')
    @ApiOperation({ summary: 'Obtener proyectos por clave de área' })
    @ApiParam({ name: 'idClaveArea', type: Number, description: 'Id de la clave de área' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos para esta área' })
    async ObtenerPorArea(
        @Param('idClaveArea', ParseIntPipe) idClaveArea: number,
    ) {
        const proyectos = await this.obtenerResProyectosUseCase.ObtenerPorIdClaveArea(idClaveArea);
        return ResProyectosPresenter.PresentarLista(proyectos);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (CREAR)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear proyecto' })
    @ApiBody({ type: CrearResProyectoDto })
    @ApiResponse({ status: 201, description: 'Proyecto creado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 409, description: 'El proyecto ya existe' })
    async Crear(
        @Body() dto: CrearResProyectoDto,
    ) {
        const proyecto = await this.crearResProyectosUseCase.Ejecutar(dto);
        return ResProyectosPresenter.Presentar(proyecto);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (ACTUALIZAR PUT)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Put('id/:id')
    @ApiOperation({ summary: 'Actualizar proyecto (PUT)' })
    @ApiParam({ name: 'id', type: Number, description: 'Id del proyecto' })
    @ApiBody({ type: ActualizarResProyectoDto })
    @ApiResponse({ status: 200, description: 'Proyecto actualizado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async ActualizarPut(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResProyectoDto,
    ) {
        const proyecto = await this.actualizarResProyectosUseCase.Ejecutar(id, dto);
        return ResProyectosPresenter.Presentar(proyecto);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (ACTUALIZAR PATCH)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Patch('id/:id')
    @ApiOperation({ summary: 'Actualizar proyecto (PATCH)' })
    @ApiParam({ name: 'id', type: Number, description: 'Id del proyecto' })
    @ApiBody({ type: ActualizarResProyectoDto })
    @ApiResponse({ status: 200, description: 'Proyecto actualizado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async ActualizarPatch(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResProyectoDto,
    ) {
        const proyecto = await this.actualizarResProyectosUseCase.Ejecutar(id, dto);
        return ResProyectosPresenter.Presentar(proyecto);
    }

    /*
        SOLO SUPER_ADMIN (ELIMINAR)
    */
    @Roles('SUPER_ADMIN')
    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar proyecto por id' })
    @ApiParam({ name: 'id', type: Number, description: 'Id del proyecto' })
    @ApiResponse({ status: 204, description: 'Proyecto eliminado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async Eliminar(
        @Param('id', ParseIntPipe) id: number,
    ) {
        await this.eliminarResProyectosUseCase.EliminarPorId(id);
    }
}