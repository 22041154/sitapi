import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
    import { SsTiposProgramasEntity } from '../../bd/entities/servicio_social/ss_tipos_programas.entity';
import { SsTiposProgramasRepository } from '../../bd/repositories/servicio_social/ss_tipos_programas.repository';
import { SsTiposProgramasController } from '../../../application/controllers/servicio_social/ss_tipos_programas.controlelr';
import { ObtenerSsTiposProgramas } from '../../../application/logic/servicio_Social/Tipos_Programas/obtener_ss_tipos_programas';

@Module({
  imports: [
    TypeOrmModule.forFeature([SsTiposProgramasEntity])
  ],

  providers: [
    ObtenerSsTiposProgramas,
    {
      provide: 'ISsTiposProgramasRepository',
      useClass: SsTiposProgramasRepository,
    },
  ],

  controllers: [
    SsTiposProgramasController
  ],

  exports: [
    ObtenerSsTiposProgramas,
  ],
})
export class SsTiposProgramasModule {}