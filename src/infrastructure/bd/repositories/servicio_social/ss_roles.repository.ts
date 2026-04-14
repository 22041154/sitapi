import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SsRolesEntity } from '../../entities/servicio_social/ss_roles..entity';
import { SsRoles } from '../../../../dtos/POCOS/servicio_social/ss_roles.poco';
import { ISsRolesRepository } from '../../../../domain/interfaces/servicio_social/ss_roles.interface';
import { CrearSsRolesDto } from '../../../../dtos/requests/Servicio Social/Roles/crear_ss_roles.dto';
import { ActualizarSsRolesDto } from '../../../../dtos/requests/Servicio Social/Roles/actualizar_ss_roles.dto';

@Injectable()
export class SsRolesRepository implements ISsRolesRepository {

  constructor(
    @InjectRepository(SsRolesEntity)
    private readonly ssRolesRepository: Repository<SsRolesEntity>,
  ) {}

  private MapearEntidadADominio(entity: SsRolesEntity): SsRoles {
    return new SsRoles(
      entity.id,
      entity.rol,
    );
  }

  async ObtenerTodos(): Promise<SsRoles[]> {
    const entities = await this.ssRolesRepository.find();
    return entities.map(entity => this.MapearEntidadADominio(entity));
  }

  async ObtenerPorId(id: number): Promise<SsRoles | null> {
    const entity = await this.ssRolesRepository.findOne({
      where: { id }
    });

    return entity ? this.MapearEntidadADominio(entity) : null;
  }

  async ObtenerPorNombreRol(rol: string): Promise<SsRoles[]> {
    const entities = await this.ssRolesRepository.find({
      where: { rol: ILike(`%${rol}%`) }
    });

    return entities.map(entity => this.MapearEntidadADominio(entity));
  }
  
  async Crear(dto: CrearSsRolesDto): Promise<SsRoles> {
    const entity = this.ssRolesRepository.create({
      rol: dto.rol,
    });

    const entityGuardada = await this.ssRolesRepository.save(entity);
    return this.MapearEntidadADominio(entityGuardada);
  }

  async Eliminar(id: number): Promise<void> {
    await this.ssRolesRepository.delete(id);
  }

  async Actualizar(id: number, dto: ActualizarSsRolesDto): Promise<SsRoles> {
    const entity = await this.ssRolesRepository.findOne({
      where: { id }
    });

    if (!entity) {
      throw new NotFoundException(`No se encontró el rol con id ${id}`);
    }

    if (dto.rol !== undefined)
      entity.rol = dto.rol;

      const entityActualizada = await this.ssRolesRepository.save(entity);
      return this.MapearEntidadADominio(entityActualizada);
    }

}