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

import { CrearResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/crear_res_catalogos_dictamen.use.case';
import { ObtenerResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/obtener_res_catalogos_dictamen.use.case';
import { EliminarResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/eliminar_res_catalogos_dictamen.use.case';
import { ActualizarResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/actualizar_res_catalogos_dictamen.iuse.case';

import { CrearResCatalogoDictamenDto } from '../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/crear_res_catalogos_dictamen.request';
import { ActualizarResCatalogoDictamenDto } from '../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/actualizar_res_catalogos_dictamen.request';

import { ResCatalogoDictamenPresenter } from '../../presenters/residencias_profesionales/res_catalogos_dictamen.presenter';

@ApiTags('Residencias Profesionales - Catálogo Dictamen')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard, RolesGuard)
@Controller('residencias-profesionales/catalogo-dictamen')
export class ResCatalogoDictamenController {

    constructor(
        private readonly crearResCatalogoDictamenUseCase: CrearResCatalogoDictamenUseCase,
        private readonly obtenerResCatalogoDictamenUseCase: ObtenerResCatalogoDictamenUseCase,
        private readonly eliminarResCatalogoDictamenUseCase: EliminarResCatalogoDictamenUseCase,
        private readonly actualizarResCatalogoDictamenUseCase: ActualizarResCatalogoDictamenUseCase,
    ) {}

    /*
        SOLO ADMIN Y SUPER_ADMIN (VER)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get()
    @ApiOperation({
        summary: 'Obtener todos los dictámenes',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de dictámenes obtenida correctamente',
    })
    @ApiResponse({
        status: 401,
        description: 'No autorizado',
    })
    @ApiResponse({
        status: 403,
        description: 'No tiene permisos',
    })
    async ObtenerTodos() {
        const data = await this.obtenerResCatalogoDictamenUseCase.ObtenerTodos();
        return ResCatalogoDictamenPresenter.PresentarLista(data);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (VER)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('id/:id')
    @ApiOperation({
        summary: 'Obtener dictamen por id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id del dictamen',
    })
    @ApiResponse({
        status: 200,
        description: 'Dictamen encontrado correctamente',
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
        description: 'Dictamen no encontrado',
    })
    async ObtenerPorId(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        const data = await this.obtenerResCatalogoDictamenUseCase.ObtenerPorId(id);
        return ResCatalogoDictamenPresenter.Presentar(data);
    }

    /*
        SOLO ADMIN Y SUPER_ADMIN (VER)
    */
    @Roles('ADMIN', 'SUPER_ADMIN')
    @Get('nombre/:nombre')
    @ApiOperation({
        summary: 'Obtener dictámenes por nombre',
    })
    @ApiParam({
        name: 'nombre',
        type: String,
        description: 'Nombre del dictamen',
    })
    @ApiResponse({
        status: 200,
        description: 'Dictámenes encontrados correctamente',
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
        description: 'No se encontraron dictámenes con ese nombre',
    })
    async ObtenerPorNombre(
        @Param('nombre')
        nombre: string,
    ) {
        const data = await this.obtenerResCatalogoDictamenUseCase.ObtenerPorNombre(nombre);
        return ResCatalogoDictamenPresenter.PresentarLista(data);
    }

    /*
        SOLO SUPER_ADMIN (CREAR)
    */
    @Roles('SUPER_ADMIN')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Crear dictamen',
    })
    @ApiBody({
        type: CrearResCatalogoDictamenDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Dictamen creado correctamente',
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
        description: 'El dictamen ya existe',
    })
    async Crear(
        @Body()
        dto: CrearResCatalogoDictamenDto,
    ) {
        const data = await this.crearResCatalogoDictamenUseCase.Ejecutar(dto);
        return ResCatalogoDictamenPresenter.Presentar(data);
    }

    /*
        SOLO SUPER_ADMIN (ACTUALIZAR PUT)
    */
    @Roles('SUPER_ADMIN')
    @Put('id/:id')
    @ApiOperation({
        summary: 'Actualizar dictamen (PUT completo)',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id del dictamen',
    })
    @ApiBody({
        type: ActualizarResCatalogoDictamenDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Dictamen actualizado correctamente',
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
        description: 'Dictamen no encontrado',
    })
    async ActualizarPut(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        dto: ActualizarResCatalogoDictamenDto,
    ) {
        const data = await this.actualizarResCatalogoDictamenUseCase.Ejecutar(id, dto);
        return ResCatalogoDictamenPresenter.Presentar(data);
    }

    /*
        SOLO SUPER_ADMIN (ACTUALIZAR PATCH)
    */
    @Roles('SUPER_ADMIN')
    @Patch('id/:id')
    @ApiOperation({
        summary: 'Actualizar dictamen (PATCH parcial)',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id del dictamen',
    })
    @ApiBody({
        type: ActualizarResCatalogoDictamenDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Dictamen actualizado correctamente',
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
        description: 'Dictamen no encontrado',
    })
    async ActualizarPatch(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        dto: ActualizarResCatalogoDictamenDto,
    ) {
        const data = await this.actualizarResCatalogoDictamenUseCase.Ejecutar(id, dto);
        return ResCatalogoDictamenPresenter.Presentar(data);
    }

    /*
        SOLO SUPER_ADMIN (ELIMINAR)
    */
    @Roles('SUPER_ADMIN')
    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Eliminar dictamen',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id del dictamen',
    })
    @ApiResponse({
        status: 204,
        description: 'Dictamen eliminado correctamente',
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
        description: 'Dictamen no encontrado',
    })
    async Eliminar(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        await this.eliminarResCatalogoDictamenUseCase.Ejecutar(id);
    }
}