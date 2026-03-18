import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SsPermisosEntity } from '../../entities/servicio_social/ss_permisos.entity';
import { SsPermisos } from '../../../../dtos/POCOS/servicio_social/ss_permisos.poco';
import { ISsPermisosRepository } from '../../../../domain/interfaces/servicio_social/ss_permisos.interface';
import { CrearSsPermisosDto } from '../../../../dtos/requests/Servicio Social/Permisos/crear_ss_permisos.dto';

@Injectable()
export class SsPermisosRepository implements ISsPermisosRepository {

  constructor(
    @InjectRepository(SsPermisosEntity)
    private readonly ssPermisosRepository: Repository<SsPermisosEntity>,
  ) {}

  private MapearEntidadADominio(entity: SsPermisosEntity): SsPermisos {
    return new SsPermisos(
      entity.id,
      entity.permiso,
    );
  }

  async ObtenerTodos(): Promise<SsPermisos[]> {
    const entities = await this.ssPermisosRepository.find();
    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

  async ObtenerPorId(id: number): Promise<SsPermisos | null> {
    const entity = await this.ssPermisosRepository.findOne({
      where: { id }
    });

    return entity ? this.MapearEntidadADominio(entity) : null;
  }

  async ObtenerPorNombrePermiso(permiso: string): Promise<SsPermisos[]> {
    const entities = await this.ssPermisosRepository.find({
      where: { permiso: ILike(`%${permiso}%`) }
    });

    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

  async Crear(dto: CrearSsPermisosDto): Promise<SsPermisos> {
    const entity = this.ssPermisosRepository.create({
      permiso: dto.permiso,
    });
    const entityGuardada = await this.ssPermisosRepository.save(entity);
    return this.MapearEntidadADominio(entityGuardada);
  }
}