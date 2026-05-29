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
    Req,
} from '@nestjs/common';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';

import { Request } from 'express';

import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { RolesGuard } from '../../../infrastructure/security/auth/roles.guard';
import { Roles } from '../../../infrastructure/security/auth/decorators/roles.decorator';

import { ObtenerResSeguimientosUseCase } from '../../logic/residencias_profesionales/Seguimientos/obtener_res_seguimientos.use.case';
import { CrearResSeguimientosUseCase } from '../../logic/residencias_profesionales/Seguimientos/crear_res_seguimientos.use.case';
import { ActualizarResSeguimientosUseCase } from '../../logic/residencias_profesionales/Seguimientos/actualizar_res_seguimientos.use.case';
import { EliminarResSeguimientosUseCase } from '../../logic/residencias_profesionales/Seguimientos/eliminar_res_seguimientos.use.case';

import { CrearResSeguimientoDto } from '../../../dtos/requests/Residencias Profesionales/res_seguimientos/crear_res_seguimientos.request';
import { ActualizarResSeguimientoDto } from '../../../dtos/requests/Residencias Profesionales/res_seguimientos/actualizar_res_siguimientos.request';

import { ResSeguimientosPresenter } from '../../presenters/residencias_profesionales/res_seguimientos.presenter';

@ApiTags('Residencias Profesionales - Seguimientos')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard)
@Controller('residencias-profesionales/seguimientos')
export class ResSeguimientosController {

    constructor(
        private readonly obtenerResSeguimientosUseCase: ObtenerResSeguimientosUseCase,
        private readonly crearResSeguimientosUseCase: CrearResSeguimientosUseCase,
        private readonly actualizarResSeguimientosUseCase: ActualizarResSeguimientosUseCase,
        private readonly eliminarResSeguimientosUseCase: EliminarResSeguimientosUseCase,
    ) {}

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get()
    @ApiOperation({
        summary: 'Obtener todos los seguimientos',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de seguimientos obtenida correctamente',
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
        const seguimientos = await this.obtenerResSeguimientosUseCase.ObtenerTodos();
        return ResSeguimientosPresenter.PresentarLista(seguimientos);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
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
        @Param('id', ParseIntPipe) id: number,
    ) {
        const seguimiento = await this.obtenerResSeguimientosUseCase.ObtenerPorId(id);
        return ResSeguimientosPresenter.Presentar(seguimiento);
    }

    /*
        ALUMNO (SOLO EL SUYO), ADMIN Y SUPER_ADMIN
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('alumno-proyecto/:idAlumnoProyecto')
    @ApiOperation({
        summary: 'Obtener seguimiento por alumno proyecto',
        description: 'ALUMNO: solo puede ver su propio seguimiento. ADMIN/SUPER_ADMIN: pueden ver cualquier seguimiento',
    })
    @ApiParam({
        name: 'idAlumnoProyecto',
        type: Number,
        description: 'Id del alumno proyecto',
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
        description: 'No tiene permisos para ver este seguimiento',
    })
    @ApiResponse({
        status: 404,
        description: 'Seguimiento no encontrado',
    })
    async ObtenerPorAlumnoProyecto(
        @Param('idAlumnoProyecto', ParseIntPipe) idAlumnoProyecto: number,
        @Req() req: any,
    ) {
        const usuario = req.user;
        const seguimiento = await this.obtenerResSeguimientosUseCase
            .ObtenerPorAlumnoProyecto(idAlumnoProyecto, usuario);
        return ResSeguimientosPresenter.Presentar(seguimiento);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (CREAR)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Crear un nuevo seguimiento',
    })
    @ApiBody({
        type: CrearResSeguimientoDto,
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
    @ApiResponse({
        status: 409,
        description: 'Ya existe un seguimiento para este alumno proyecto',
    })
    async Crear(
        @Body() dto: CrearResSeguimientoDto,
    ) {
        const seguimiento = await this.crearResSeguimientosUseCase.Ejecutar(dto);
        return ResSeguimientosPresenter.Presentar(seguimiento);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (ACTUALIZAR PUT)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Put('id/:id')
    @ApiOperation({
        summary: 'Actualizar completamente un seguimiento',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id del seguimiento',
    })
    @ApiBody({
        type: ActualizarResSeguimientoDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Seguimiento actualizado correctamente',
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
    @ApiResponse({
        status: 404,
        description: 'Seguimiento no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'Ya existe un seguimiento para este alumno proyecto',
    })
    async Actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResSeguimientoDto,
    ) {
        const seguimiento = await this.actualizarResSeguimientosUseCase.Ejecutar(id, dto);
        return ResSeguimientosPresenter.Presentar(seguimiento);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (ACTUALIZAR PATCH)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Patch('id/:id')
    @ApiOperation({
        summary: 'Actualizar parcialmente un seguimiento',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id del seguimiento',
    })
    @ApiBody({
        type: ActualizarResSeguimientoDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Seguimiento actualizado parcialmente correctamente',
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
    @ApiResponse({
        status: 404,
        description: 'Seguimiento no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'Ya existe un seguimiento para este alumno proyecto',
    })
    async ActualizarParcial(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResSeguimientoDto,
    ) {
        const seguimiento = await this.actualizarResSeguimientosUseCase.Ejecutar(id, dto);
        return ResSeguimientosPresenter.Presentar(seguimiento);
    }

    /*
        SOLO SUPER_ADMIN (ELIMINAR)
    */
    @Roles('SUPER_ADMIN')
    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Eliminar seguimiento por id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id del seguimiento',
    })
    @ApiResponse({
        status: 204,
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
    async EliminarPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {
        await this.eliminarResSeguimientosUseCase.EliminarPorId(id);
    }
}