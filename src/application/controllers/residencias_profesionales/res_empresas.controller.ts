import {
    Controller,
    Get,
    Post,
    Delete,
    Put,
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

import { ObtenerResEmpresasUseCase } from '../../logic/residencias_profesionales/Empresas/obtener_res_empresas.logic';
import { CrearResEmpresasUseCase } from '../../logic/residencias_profesionales/Empresas/crear_res_empresas.logic';
import { EliminarResEmpresasUseCase } from '../../logic/residencias_profesionales/Empresas/eliminar_res_empresas.logic';
import { ActualizarResEmpresasUseCase } from '../../logic/residencias_profesionales/Empresas/actualizar_res_empresas.logic';

import { CrearResEmpresaDto } from '../../../dtos/requests/Residencias Profesionales/res_empresas/crear_res_empresas.dto';
import { ActualizarResEmpresaDto } from '../../../dtos/requests/Residencias Profesionales/res_empresas/actualizar_res_empresas.dto';

@ApiTags('Residencias Profesionales - Empresas')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard)
@Controller('residencias-profesionales/empresas')
export class ResEmpresasController {

    constructor(
        private readonly obtenerResEmpresasUseCase: ObtenerResEmpresasUseCase,
        private readonly crearResEmpresasUseCase: CrearResEmpresasUseCase,
        private readonly eliminarResEmpresasUseCase: EliminarResEmpresasUseCase,
        private readonly actualizarResEmpresasUseCase: ActualizarResEmpresasUseCase,
    ) {}

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN)
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get()
    @ApiOperation({
        summary: 'Obtener todas las empresas',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de empresas obtenida correctamente',
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
        description: 'No se encontraron empresas',
    })
    async ObtenerTodos() {
        return this.obtenerResEmpresasUseCase.ObtenerTodos();
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN)
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('id/:id')
    @ApiOperation({
        summary: 'Obtener empresa por id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id de la empresa',
    })
    @ApiResponse({
        status: 200,
        description: 'Empresa encontrada correctamente',
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
        description: 'Empresa no encontrada',
    })
    async ObtenerPorId(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.obtenerResEmpresasUseCase.ObtenerPorId(id);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN)
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('nombre/:nombre')
    @ApiOperation({
        summary: 'Obtener empresas por nombre',
    })
    @ApiParam({
        name: 'nombre',
        type: String,
        description: 'Nombre de la empresa',
    })
    @ApiResponse({
        status: 200,
        description: 'Empresas encontradas correctamente',
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
        description: 'No se encontraron empresas con ese nombre',
    })
    async ObtenerPorNombre(
        @Param('nombre')
        nombre: string,
    ) {
        return this.obtenerResEmpresasUseCase.ObtenerPorNombre(nombre);
    }

    /*
        TODOS LOS ROLES (ALUMNO, ADMIN, SUPER_ADMIN)
    */
    @Roles('ALUMNO', 'ADMIN', 'SUPER_ADMIN')
    @Get('localizacion/:localizacion')
    @ApiOperation({
        summary: 'Obtener empresas por localización',
    })
    @ApiParam({
        name: 'localizacion',
        type: String,
        description: 'Localización de la empresa',
    })
    @ApiResponse({
        status: 200,
        description: 'Empresas encontradas correctamente',
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
        description: 'No se encontraron empresas en esa localización',
    })
    async ObtenerPorLocalizacion(
        @Param('localizacion')
        localizacion: string,
    ) {
        return this.obtenerResEmpresasUseCase.ObtenerPorLocalizacion(localizacion);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Crear una nueva empresa',
    })
    @ApiBody({
        type: CrearResEmpresaDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Empresa creada correctamente',
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
        description: 'La empresa ya existe',
    })
    async Crear(
        @Body()
        dto: CrearResEmpresaDto,
    ) {
        return this.crearResEmpresasUseCase.Ejecutar(dto);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Put('id/:id')
    @ApiOperation({
        summary: 'Actualizar empresa por id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id de la empresa',
    })
    @ApiBody({
        type: ActualizarResEmpresaDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Empresa actualizada correctamente',
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
        description: 'Empresa no encontrada',
    })
    @ApiResponse({
        status: 409,
        description: 'Conflicto con datos existentes',
    })
    async Actualizar(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        dto: ActualizarResEmpresaDto,
    ) {
        return this.actualizarResEmpresasUseCase.Ejecutar(id, dto);
    }

    /*
        SOLO SUPER_ADMIN
    */
    @Roles('SUPER_ADMIN')
    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Eliminar empresa por id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id de la empresa',
    })
    @ApiResponse({
        status: 204,
        description: 'Empresa eliminada correctamente',
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
        description: 'Empresa no encontrada',
    })
    async EliminarPorId(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        await this.eliminarResEmpresasUseCase.EliminarPorId(id);
    }

    /*
        SOLO SUPER_ADMIN
    */
    @Roles('SUPER_ADMIN')
    @Delete('nombre/:nombre')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Eliminar empresas por nombre',
    })
    @ApiParam({
        name: 'nombre',
        type: String,
        description: 'Nombre de la empresa',
    })
    @ApiResponse({
        status: 204,
        description: 'Empresas eliminadas correctamente',
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
        description: 'No se encontraron empresas con ese nombre',
    })
    async EliminarPorNombre(
        @Param('nombre')
        nombre: string,
    ) {
        await this.eliminarResEmpresasUseCase.EliminarPorNombre(nombre);
    }
}