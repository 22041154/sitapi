import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SsOrganizacionesEntity } from '../../entities/servicio_social/ss_organizaciones.entity';
import { SsOrganizaciones } from '../../../../dtos/POCOS/servicio_social/ss_organizaciones.poco';
import { ISsOrganizacionesRepository } from '../../../../domain/interfaces/servicio_social/ss_organizaciones';
import { CrearSsOrganizacionDto } from '../../../../dtos/requests/Servicio Social/Organizaciones/Crear_Organoiazciones_DTO';
import { ActualizarSsOrganizacionDto } from '../../../../dtos/requests/Servicio Social/Organizaciones/Actualizar_Organizaciones_DTO';

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

  async Crear(dto: CrearSsOrganizacionDto): Promise<SsOrganizaciones> {
    const entity = this.ssOrganizacionesRepository.create({
      nombre_organizacion: dto.nombre_organizacion,
      nombre_titular_organizacion: dto.nombre_titular_organizacion,
      puesto_titular_organizaciones: dto.puesto_titular_organizaciones,
    });

    const entityGuardada = await this.ssOrganizacionesRepository.save(entity);

    return this.MapearEntidadADominio(entityGuardada);
  }

  async Eliminar(id: number): Promise<void> {
    const entity = await this.ssOrganizacionesRepository.findOne({
      where: { id }
    });

    if (!entity) {
      throw new NotFoundException(`No se encontró la organización con id ${id}`);
    }

    await this.ssOrganizacionesRepository.delete(id);
  }

  async EliminarPorNombre(nombre: string): Promise<void> {
    const entities = await this.ssOrganizacionesRepository.find({
      where: { nombre_organizacion: ILike(`%${nombre}%`) }
    });

    if (!entities || entities.length === 0) {
      throw new NotFoundException(`No se encontró ninguna organización con el nombre ${nombre}`);
    }

    await this.ssOrganizacionesRepository.delete(
      entities.map(entity => entity.id)
    );
  }

  async Actualizar(id: number, dto: ActualizarSsOrganizacionDto): Promise<SsOrganizaciones> {
    const entity = await this.ssOrganizacionesRepository.findOne({
      where: { id }
    });

    if (!entity) {
      throw new NotFoundException(`No se encontró la organización con id ${id}`);
    }

    if (dto.nombre_organizacion !== undefined)
      entity.nombre_organizacion = dto.nombre_organizacion;

    if (dto.nombre_titular_organizacion !== undefined)
      entity.nombre_titular_organizacion = dto.nombre_titular_organizacion;

    if (dto.puesto_titular_organizaciones !== undefined)
      entity.puesto_titular_organizaciones = dto.puesto_titular_organizaciones;

    const entityActualizada = await this.ssOrganizacionesRepository.save(entity);
    return this.MapearEntidadADominio(entityActualizada);
  }
}