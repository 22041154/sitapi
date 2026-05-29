import {
    Controller,
    Get,
    Post,
    Put,
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

import { ObtenerResCalificacionesUseCase } from '../../logic/residencias_profesionales/Calificaciones/obtener_res_calificaciones.use.case';
import { CrearResCalificacionesUseCase } from '../../logic/residencias_profesionales/Calificaciones/crear_res_calificaciones.use.case';
import { ActualizarResCalificacionesUseCase } from '../../logic/residencias_profesionales/Calificaciones/actualizar_res_calificaciones.use.case';
import { EliminarResCalificacionesUseCase } from '../../logic/residencias_profesionales/Calificaciones/eliminar_res_calificaciones.use.case';

import { CrearResCalificacionDto } from '../../../dtos/requests/Residencias Profesionales/res_calificaciones/crear_res_calificaciones.request';
import { ActualizarResCalificacionDto } from '../../../dtos/requests/Residencias Profesionales/res_calificaciones/actualizar_res_calificaciones.request';

import { ResCalificacionesPresenter } from '../../presenters/residencias_profesionales/res_calificaiones.presenter';

@ApiTags('Residencias Profesionales - Calificaciones')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard)
@Controller('residencias-profesionales/calificaciones')
export class ResCalificacionesController {

    constructor(
        private readonly obtenerResCalificacionesUseCase: ObtenerResCalificacionesUseCase,
        private readonly crearResCalificacionesUseCase: CrearResCalificacionesUseCase,
        private readonly actualizarResCalificacionesUseCase: ActualizarResCalificacionesUseCase,
        private readonly eliminarResCalificacionesUseCase: EliminarResCalificacionesUseCase,
    ) {}

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get()
    @ApiOperation({ summary: 'Obtener todas las calificaciones' })
    @ApiResponse({ status: 200, description: 'Calificaciones obtenidas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron calificaciones' })
    async ObtenerTodos() {
        const calificaciones = await this.obtenerResCalificacionesUseCase.ObtenerTodos();
        return ResCalificacionesPresenter.PresentarLista(calificaciones);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('id/:id')
    @ApiOperation({ summary: 'Obtener calificación por id' })
    @ApiParam({ name: 'id', type: Number, description: 'Id de la calificación' })
    @ApiResponse({ status: 200, description: 'Calificación encontrada correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
    async ObtenerPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {
        const calificacion = await this.obtenerResCalificacionesUseCase.ObtenerPorId(id);
        return ResCalificacionesPresenter.Presentar(calificacion);
    }

    /*
        ALUMNO (SOLO EL SUYO), ADMIN Y SUPER_ADMIN
        NOTA: La validación de que el alumno solo vea sus propios registros
        debe implementarse en el UseCase o en un Guard personalizado
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('alumno-proyecto/:idAlumnoProyecto')
    @ApiOperation({ 
        summary: 'Obtener calificación por alumno proyecto',
        description: 'ALUMNO: solo puede ver su propia calificación. ADMIN/SUPER_ADMIN: pueden ver cualquier calificación'
    })
    @ApiParam({ name: 'idAlumnoProyecto', type: Number, description: 'Id del alumno proyecto' })
    @ApiResponse({ status: 200, description: 'Calificación encontrada correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos para ver esta calificación' })
    @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
    async ObtenerPorAlumnoProyecto(
        @Param('idAlumnoProyecto', ParseIntPipe) idAlumnoProyecto: number,
    ) {
        // La validación de que el alumno solo vea sus propios registros
        // debe estar dentro del UseCase o mediante un Guard personalizado
        const calificacion = await this.obtenerResCalificacionesUseCase.ObtenerPorAlumnoProyecto(idAlumnoProyecto);
        return ResCalificacionesPresenter.Presentar(calificacion);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('materia/:idMateria')
    @ApiOperation({ summary: 'Obtener calificaciones por materia' })
    @ApiParam({ name: 'idMateria', type: Number, description: 'Id de la materia' })
    @ApiResponse({ status: 200, description: 'Calificaciones encontradas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron calificaciones' })
    async ObtenerPorMateria(
        @Param('idMateria', ParseIntPipe) idMateria: number,
    ) {
        const calificaciones = await this.obtenerResCalificacionesUseCase.ObtenerPorMateria(idMateria);
        return ResCalificacionesPresenter.PresentarLista(calificaciones);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('grupo/:idGrupo')
    @ApiOperation({ summary: 'Obtener calificaciones por grupo' })
    @ApiParam({ name: 'idGrupo', type: Number, description: 'Id del grupo' })
    @ApiResponse({ status: 200, description: 'Calificaciones encontradas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron calificaciones' })
    async ObtenerPorGrupo(
        @Param('idGrupo', ParseIntPipe) idGrupo: number,
    ) {
        const calificaciones = await this.obtenerResCalificacionesUseCase.ObtenerPorGrupo(idGrupo);
        return ResCalificacionesPresenter.PresentarLista(calificaciones);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('folio-acta/:folioActa')
    @ApiOperation({ summary: 'Obtener calificaciones por folio de acta' })
    @ApiParam({ name: 'folioActa', type: String, description: 'Folio del acta de residencia' })
    @ApiResponse({ status: 200, description: 'Calificaciones encontradas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron calificaciones' })
    async ObtenerPorFolioActa(
        @Param('folioActa') folioActa: string,
    ) {
        const calificaciones = await this.obtenerResCalificacionesUseCase.ObtenerPorFolioActa(folioActa);
        return ResCalificacionesPresenter.PresentarLista(calificaciones);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('capturadas')
    @ApiOperation({ summary: 'Obtener calificaciones capturadas' })
    @ApiResponse({ status: 200, description: 'Calificaciones capturadas obtenidas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron calificaciones capturadas' })
    async ObtenerCapturadas() {
        const calificaciones = await this.obtenerResCalificacionesUseCase.ObtenerCapturadas();
        return ResCalificacionesPresenter.PresentarLista(calificaciones);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('pendientes-captura')
    @ApiOperation({ summary: 'Obtener calificaciones pendientes de captura' })
    @ApiResponse({ status: 200, description: 'Calificaciones pendientes obtenidas correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'No se encontraron calificaciones pendientes' })
    async ObtenerPendientesCaptura() {
        const calificaciones = await this.obtenerResCalificacionesUseCase.ObtenerPendientesCaptura();
        return ResCalificacionesPresenter.PresentarLista(calificaciones);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (CREAR)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear calificación de residencia' })
    @ApiBody({ type: CrearResCalificacionDto })
    @ApiResponse({ status: 201, description: 'Calificación creada correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 409, description: 'La calificación ya existe' })
    async Crear(
        @Body() dto: CrearResCalificacionDto,
    ) {
        const calificacion = await this.crearResCalificacionesUseCase.Ejecutar(dto);
        return ResCalificacionesPresenter.Presentar(calificacion);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (ACTUALIZAR)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Put('id/:id')
    @ApiOperation({ summary: 'Actualizar calificación de residencia' })
    @ApiParam({ name: 'id', type: Number, description: 'Id de la calificación' })
    @ApiBody({ type: ActualizarResCalificacionDto })
    @ApiResponse({ status: 200, description: 'Calificación actualizada correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
    @ApiResponse({ status: 409, description: 'La calificación ya fue capturada oficialmente' })
    async Actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResCalificacionDto,
    ) {
        const calificacion = await this.actualizarResCalificacionesUseCase.Ejecutar(id, dto);
        return ResCalificacionesPresenter.Presentar(calificacion);
    }

    /*
        SOLO SUPER_ADMIN (ELIMINAR)
    */
    @Roles('SUPER_ADMIN')
    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar calificación de residencia' })
    @ApiParam({ name: 'id', type: Number, description: 'Id de la calificación' })
    @ApiResponse({ status: 204, description: 'Calificación eliminada correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos' })
    @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
    @ApiResponse({ status: 409, description: 'No se puede eliminar una calificación capturada' })
    async EliminarPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {
        await this.eliminarResCalificacionesUseCase.EliminarPorId(id);
    }
}