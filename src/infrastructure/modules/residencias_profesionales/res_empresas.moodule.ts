import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResEmpresasEntity } from '../../bd/entities/residencias_profesionales/res_empresas';
import { ResEmpresasRepository } from '../../bd/repositories/residencias_profesionales/rp_empresas.repository';
import { ResEmpresasController } from '../../../application/controllers/residencias_profesionales/res_empresas.controller';
import { ObtenerResEmpresasUseCase } from '../../../application/logic/residencias_profesionales/Empresas/obtener_res_empresas.logic';
import { CrearResEmpresasUseCase } from '../../../application/logic/residencias_profesionales/Empresas/crear_res_empresas.logic';
import { EliminarResEmpresasUseCase } from '../../../application/logic/residencias_profesionales/Empresas/eliminar_res_empresas.logic';
import { ActualizarResEmpresasUseCase } from '../../../application/logic/residencias_profesionales/Empresas/actualizar_res_empresas.logic';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResEmpresasEntity])
  ],

  providers: [
    CrearResEmpresasUseCase,
    ObtenerResEmpresasUseCase,
    EliminarResEmpresasUseCase,
    ActualizarResEmpresasUseCase,
    {
      provide: 'IResEmpresasRepository',
      useClass: ResEmpresasRepository,
    },
  ],

  controllers: [
    ResEmpresasController
  ],

  exports: [
    ObtenerResEmpresasUseCase,
    CrearResEmpresasUseCase,
    EliminarResEmpresasUseCase,
    ActualizarResEmpresasUseCase,
  ],
})
export class ResEmpresasModule {}
