import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SsTiposProgramasEntity } from '../../entities/servicio_social/ss_tipos_programas.entity';
import { SsTiposProgramas } from '../../../../dtos/POCOS/servicio_social/ss_tipos_programas.poco';
import { ISsTiposProgramasRepository } from '../../../../domain/interfaces/servicio_social/ss_tipos_programas.interface';

@Injectable()
export class SsTiposProgramasRepository implements ISsTiposProgramasRepository {

  constructor(
    @InjectRepository(SsTiposProgramasEntity)
    private readonly ssTiposProgramasRepository: Repository<SsTiposProgramasEntity>,
  ) {}

  private MapearEntidadADominio(entity: SsTiposProgramasEntity): SsTiposProgramas {
    return new SsTiposProgramas(
      entity.id,
      entity.nombre_tipo,
    );
  }

  async ObtenerTodos(): Promise<SsTiposProgramas[]> {
    const entities = await this.ssTiposProgramasRepository.find();
    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

  async ObtenerPorId(id: number): Promise<SsTiposProgramas | null> {
    const entity = await this.ssTiposProgramasRepository.findOne({
      where: { id }
    });

    return entity ? this.MapearEntidadADominio(entity) : null;
  }

  async ObtenerPorNombreTipo(nombreTipo: string): Promise<SsTiposProgramas[]> {
    const entities = await this.ssTiposProgramasRepository.find({
      where: { nombre_tipo: ILike(`%${nombreTipo}%`) }
    });

    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

}