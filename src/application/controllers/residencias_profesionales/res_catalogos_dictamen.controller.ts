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

import { CrearResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/crear_res_catalogos_dictamen.use.case';
import { ObtenerResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/obtener_res_catalogos_dictamen.use.case';
import { EliminarResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/eliminar_res_catalogos_dictamen.use.case';
import { ActualizarResCatalogoDictamenUseCase } from '../../logic/residencias_profesionales/Catalogos Dictamen/actualizar_res_catalogos_dictamen.iuse.case';

import { CrearResCatalogoDictamenDto } from '../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/crear_res_catalogos_dictamen.request';
import { ActualizarResCatalogoDictamenDto } from '../../../dtos/requests/Residencias Profesionales/res_catalogos_dictamen/actualizar_res_catalogos_dictamen.request';

import { ResCatalogoDictamenPresenter } from '../../presenters/residencias_profesionales/res_catalogos_dictamen.presenter';

@ApiTags('Residencias Profesionales - Catálogo Dictamen')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('residencias-profesionales/catalogo-dictamen')
export class ResCatalogoDictamenController {

    constructor(
        private readonly crearResCatalogoDictamenUseCase:
        CrearResCatalogoDictamenUseCase,

        private readonly obtenerResCatalogoDictamenUseCase:
        ObtenerResCatalogoDictamenUseCase,

        private readonly eliminarResCatalogoDictamenUseCase:
        EliminarResCatalogoDictamenUseCase,

        private readonly actualizarResCatalogoDictamenUseCase:
        ActualizarResCatalogoDictamenUseCase,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Obtener todos los dictámenes',
    })
    async ObtenerTodos() {

        const data =
            await this.obtenerResCatalogoDictamenUseCase
                .ObtenerTodos();

        return ResCatalogoDictamenPresenter.PresentarLista(data);

    }

    @Get('id/:id')
    @ApiOperation({
        summary: 'Obtener dictamen por id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
    })
    async ObtenerPorId(
        @Param('id', ParseIntPipe)
        id: number,
    ) {

        const data =
            await this.obtenerResCatalogoDictamenUseCase
                .ObtenerPorId(id);

        return ResCatalogoDictamenPresenter.Presentar(data);

    }

    @Get('nombre/:nombre')
    @ApiOperation({
        summary: 'Obtener dictámenes por nombre',
    })
    @ApiParam({
        name: 'nombre',
        type: String,
    })
    async ObtenerPorNombre(
        @Param('nombre')
        nombre: string,
    ) {

        const data =
            await this.obtenerResCatalogoDictamenUseCase
                .ObtenerPorNombre(nombre);

        return ResCatalogoDictamenPresenter.PresentarLista(data);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Crear dictamen',
    })
    @ApiBody({
        type: CrearResCatalogoDictamenDto,
    })
    async Crear(
        @Body()
        dto: CrearResCatalogoDictamenDto,
    ) {

        const data =
            await this.crearResCatalogoDictamenUseCase
                .Ejecutar(dto);

        return ResCatalogoDictamenPresenter.Presentar(data);

    }

    @Put('id/:id')
    @ApiOperation({
        summary: 'Actualizar dictamen (PUT completo)',
    })
    async ActualizarPut(
        @Param('id', ParseIntPipe)
        id: number,

        @Body()
        dto: ActualizarResCatalogoDictamenDto,
    ) {

        const data =
            await this.actualizarResCatalogoDictamenUseCase
                .Ejecutar(id, dto);

        return ResCatalogoDictamenPresenter.Presentar(data);

    }

    @Patch('id/:id')
    @ApiOperation({
        summary: 'Actualizar dictamen (PATCH parcial)',
    })
    async ActualizarPatch(
        @Param('id', ParseIntPipe)
        id: number,

        @Body()
        dto: ActualizarResCatalogoDictamenDto,
    ) {

        const data =
            await this.actualizarResCatalogoDictamenUseCase
                .Ejecutar(id, dto);

        return ResCatalogoDictamenPresenter.Presentar(data);

    }

    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Eliminar dictamen',
    })
    async Eliminar(
        @Param('id', ParseIntPipe)
        id: number,
    ) {

        await this.eliminarResCatalogoDictamenUseCase
            .Ejecutar(id);

    }

}