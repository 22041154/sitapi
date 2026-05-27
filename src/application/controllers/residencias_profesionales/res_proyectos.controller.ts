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
        private readonly obtenerResProyectosUseCase:
        ObtenerResProyectosUseCase,

        private readonly crearResProyectosUseCase:
        CrearResProyectosUseCase,

        private readonly actualizarResProyectosUseCase:
        ActualizarResProyectosUseCase,

        private readonly eliminarResProyectosUseCase:
        EliminarResProyectosUseCase,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los proyectos' })
    async ObtenerTodos() {

        const proyectos =
            await this.obtenerResProyectosUseCase.ObtenerTodos();

        return ResProyectosPresenter.PresentarLista(proyectos);

    }

    @Get('id/:id')
    @ApiOperation({ summary: 'Obtener proyecto por id' })
    async ObtenerPorId(
        @Param('id', ParseIntPipe) id: number,
    ) {

        const proyecto =
            await this.obtenerResProyectosUseCase.ObtenerPorId(id);

        return ResProyectosPresenter.Presentar(proyecto);

    }

    @Get('empresa/:idEmpresa')
    @ApiOperation({ summary: 'Obtener proyectos por empresa' })
    async ObtenerPorEmpresa(
        @Param('idEmpresa', ParseIntPipe) idEmpresa: number,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase
                .ObtenerPorEmpresa(idEmpresa);

        return ResProyectosPresenter.PresentarLista(proyectos);

    }

    @Get('folio/:folio')
    @ApiOperation({ summary: 'Obtener proyectos por folio' })
    async ObtenerPorFolio(
        @Param('folio') folio: string,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase
                .ObtenerPorFolio(folio);

        return ResProyectosPresenter.PresentarLista(proyectos);

    }

    @Get('nombre/:nombre')
    @ApiOperation({ summary: 'Obtener proyectos por nombre' })
    async ObtenerPorNombre(
        @Param('nombre') nombre: string,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase
                .ObtenerPorNombre(nombre);

        return ResProyectosPresenter.PresentarLista(proyectos);

    }

    @Get('asesor/:nombreAsesor')
    @ApiOperation({ summary: 'Obtener proyectos por asesor externo' })
    async ObtenerPorAsesor(
        @Param('nombreAsesor') nombreAsesor: string,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase
                .ObtenerPorNombreAsesorExterno(nombreAsesor);

        return ResProyectosPresenter.PresentarLista(proyectos);

    }

    @Get('area/:idClaveArea')
    @ApiOperation({ summary: 'Obtener proyectos por clave de área' })
    async ObtenerPorArea(
        @Param('idClaveArea', ParseIntPipe) idClaveArea: number,
    ) {

        const proyectos =
            await this.obtenerResProyectosUseCase
                .ObtenerPorIdClaveArea(idClaveArea);

        return ResProyectosPresenter.PresentarLista(proyectos);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear proyecto' })
    async Crear(
        @Body() dto: CrearResProyectoDto,
    ) {

        const proyecto =
            await this.crearResProyectosUseCase.Ejecutar(dto);

        return ResProyectosPresenter.Presentar(proyecto);

    }

    @Put('id/:id')
    @ApiOperation({ summary: 'Actualizar proyecto (PUT)' })
    async ActualizarPut(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResProyectoDto,
    ) {

        const proyecto =
            await this.actualizarResProyectosUseCase.Ejecutar(id, dto);

        return ResProyectosPresenter.Presentar(proyecto);

    }

    @Patch('id/:id')
    @ApiOperation({ summary: 'Actualizar proyecto (PATCH)' })
    async ActualizarPatch(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarResProyectoDto,
    ) {

        const proyecto =
            await this.actualizarResProyectosUseCase.Ejecutar(id, dto);

        return ResProyectosPresenter.Presentar(proyecto);

    }

    @Delete('id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar proyecto por id' })
    async Eliminar(
        @Param('id', ParseIntPipe) id: number,
    ) {

        await this.eliminarResProyectosUseCase.EliminarPorId(id);

    }

}