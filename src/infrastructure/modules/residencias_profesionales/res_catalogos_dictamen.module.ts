import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResCatalogoDictamenEntity } from '../../bd/entities/residencias_profesionales/res_catalogo_dictamen.entity';

import { ResCatalogoDictamenRepository } from '../../bd/repositories/residencias_profesionales/rp_catalogos_dictamen.repository';

import { ResCatalogoDictamenController } from '../../../application/controllers/residencias_profesionales/res_catalogos_dictamen.controller';

import { CrearResCatalogoDictamenUseCase } from '../../../application/logic/residencias_profesionales/Catalogos Dictamen/crear_res_catalogos_dictamen.use.case';
import { ObtenerResCatalogoDictamenUseCase } from '../../../application/logic/residencias_profesionales/Catalogos Dictamen/obtener_res_catalogos_dictamen.use.case';
import { ActualizarResCatalogoDictamenUseCase } from '../../../application/logic/residencias_profesionales/Catalogos Dictamen/actualizar_res_catalogos_dictamen.iuse.case';
import { EliminarResCatalogoDictamenUseCase } from '../../../application/logic/residencias_profesionales/Catalogos Dictamen/eliminar_res_catalogos_dictamen.use.case';

@Module({

    imports: [
        TypeOrmModule.forFeature([
            ResCatalogoDictamenEntity,
        ]),
    ],

    providers: [
        ResCatalogoDictamenRepository,

        CrearResCatalogoDictamenUseCase,
        ObtenerResCatalogoDictamenUseCase,
        ActualizarResCatalogoDictamenUseCase,
        EliminarResCatalogoDictamenUseCase,

        {
            provide: 'IResCatalogoDictamenRepository',
            useClass: ResCatalogoDictamenRepository,
        },
    ],

    controllers: [
        ResCatalogoDictamenController,
    ],

    exports: [
        CrearResCatalogoDictamenUseCase,
        ObtenerResCatalogoDictamenUseCase,
        ActualizarResCatalogoDictamenUseCase,
        EliminarResCatalogoDictamenUseCase,
    ],

})
export class ResCatalogoDictamenModule {}