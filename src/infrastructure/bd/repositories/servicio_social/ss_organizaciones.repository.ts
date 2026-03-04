import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SsOrganizacionesEntity } from '../../entities/servicio_social/ss_organizaciones.entity';
import { SsOrganizaciones } from '../../../../dtos/POCOS/servicio_social/ss_organizaciones.poco';
import { ISsOrganizacionesRepository } from '../../../../domain/interfaces/servicio_social/ss_organizaciones.repository';

@Injectable()
export class SsOrganizacionesRepository implements ISsOrganizacionesRepository {

  constructor(
    @InjectRepository(SsOrganizacionesEntity)
    private readonly ssOrganizacionesRepository: Repository<SsOrganizacionesEntity>,
  ) {}

  private MapearEntidadADominio(entity: SsOrganizacionesEntity): SsOrganizaciones {
    return new SsOrganizaciones(
      entity.id,
      entity.nombre_organizacion,
      entity.nombre_titular_organizacion,
      entity.puesto_titular_organizaciones,
    );
  }

  async ObtenerTodos(): Promise<SsOrganizaciones[]> {
    const entities = await this.ssOrganizacionesRepository.find();
    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

  async ObtenerPorId(id: number): Promise<SsOrganizaciones | null> {
    const entity = await this.ssOrganizacionesRepository.findOne({
      where: { id }
    });

    return entity ? this.MapearEntidadADominio(entity) : null;
  }

  async ObtenerPorNombreOrganizacion(nombre: string): Promise<SsOrganizaciones[]> {
    const entities = await this.ssOrganizacionesRepository.find({
      where: { nombre_organizacion: ILike(`%${nombre}%`) }
    });

    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

  async ObtenerPorNombreTitular(nombreTitular: string): Promise<SsOrganizaciones[]> {
    const entities = await this.ssOrganizacionesRepository.find({
      where: { nombre_titular_organizacion: ILike(`%${nombreTitular}%`) }
    });

    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

}