import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SsRolesPermisosEntity } from '../../entities/servicio_social/ss_roles_permisos.entity';
import { SsRolesEntity } from '../../entities/servicio_social/ss_roles..entity';
import { SsPermisosEntity } from '../../entities/servicio_social/ss_permisos.entity';
import { SsRolesPermisos } from '../../../../dtos/POCOS/servicio_social/ss_roles_permisos.poco';
import { ISsRolesPermisosRepository } from '../../../../domain/interfaces/servicio_social/ss_roles_permisos.interface';
import { CrearSsRolPermisoDto } from '../../../../dtos/requests/Servicio Social/Roles_Permisos/crear_ss_roles_permisos.dto';

@Injectable()
export class SsRolesPermisosRepository implements ISsRolesPermisosRepository {

  constructor(
    @InjectRepository(SsRolesPermisosEntity)
    private readonly ssRolesPermisosRepository: Repository<SsRolesPermisosEntity>,
  ) {}

  private MapearEntidadADominio(row: any): SsRolesPermisos {
    return new SsRolesPermisos(
      Number(row.id),
      Number(row.id_ss_rol),
      row.nombre_rol,
      Number(row.id_ss_permiso),
      row.nombre_permiso,
    );
  }

  private ConstruirQuery() {
    return this.ssRolesPermisosRepository
      .createQueryBuilder('roles_permisos')
      .leftJoin(
        SsRolesEntity,
        'rol',
        'rol.id = roles_permisos.id_ss_rol'
      )
      .leftJoin(
        SsPermisosEntity,
        'permiso',
        'permiso.id = roles_permisos.id_ss_permiso'
      )
      .select([
        'roles_permisos.id AS id',
        'roles_permisos.id_ss_rol AS id_ss_rol',
        'rol.rol AS nombre_rol',
        'roles_permisos.id_ss_permiso AS id_ss_permiso',
        'permiso.permiso AS nombre_permiso',
      ]);
  }

  async ObtenerTodos(): Promise<SsRolesPermisos[]> {
    const results = await this.ConstruirQuery().getRawMany();
    return results.map(row => this.MapearEntidadADominio(row));
  }

  async ObtenerPorId(id: number): Promise<SsRolesPermisos | null> {
    const row = await this.ConstruirQuery()
      .where('roles_permisos.id = :id', { id })
      .getRawOne();

    return row ? this.MapearEntidadADominio(row) : null;
  }

  async ObtenerPorRol(idRol: number): Promise<SsRolesPermisos[]> {
    const results = await this.ConstruirQuery()
      .where('roles_permisos.id_ss_rol = :idRol', { idRol })
      .getRawMany();

    return results.map(row => this.MapearEntidadADominio(row));
  }

  async ObtenerPorPermiso(idPermiso: number): Promise<SsRolesPermisos[]> {
    const results = await this.ConstruirQuery()
      .where('roles_permisos.id_ss_permiso = :idPermiso', { idPermiso })
      .getRawMany();

    return results.map(row => this.MapearEntidadADominio(row));
  }

  async Crear(dto: CrearSsRolPermisoDto): Promise<SsRolesPermisos> {
    const entity = this.ssRolesPermisosRepository.create({
      id_ss_rol: dto.id_ss_rol,
      id_ss_permiso: dto.id_ss_permiso,
    });

    const entityGuardada = await this.ssRolesPermisosRepository.save(entity);

    return this.ObtenerPorId(Number(entityGuardada.id));
  }

}