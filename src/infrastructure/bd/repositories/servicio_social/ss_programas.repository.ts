import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SsProgramasEntity } from '../../entities/servicio_social/ss_programas.entity';
import { SsOrganizacionesEntity } from '../../entities/servicio_social/ss_organizaciones.entity';
import { SsTiposProgramasEntity } from '../../entities/servicio_social/ss_tipos_programas.entity';
import { SsProgramas } from '../../../../dtos/POCOS/servicio_social/ss_programas.poco';
import { ISsProgramasRepository } from '../../../../domain/interfaces/servicio_social/ss_programas.interface';
import { CrearSsProgramaDto } from '../../../../dtos/requests/Servicio Social/Programas/crear_ss_programas';

@Injectable()
export class SsProgramasRepository implements ISsProgramasRepository {

  constructor(
    @InjectRepository(SsProgramasEntity)
    private readonly ssProgramasRepository: Repository<SsProgramasEntity>,
  ) {}

  private MapearEntidadADominio(row: any): SsProgramas {
    return new SsProgramas(
      Number(row.id),
      Number(row.id_organizacion),
      row.nombre_organizacion,
      Number(row.id_tipo_programa),
      row.nombre_tipo,
      row.nombre_programa,
      row.lista_actividades,
      row.modalidad,
      row.fecha_inicio_servicio,
      row.fecha_fin_servicio,
      row.plan_trabajo,
    );
  }

  private ConstruirQuery() {
    return this.ssProgramasRepository
      .createQueryBuilder('programa')
      .leftJoin(
        SsOrganizacionesEntity,
        'organizacion',
        'organizacion.id = programa.id_organizacion'
      )
      .leftJoin(
        SsTiposProgramasEntity,
        'tipo',
        'tipo.id = programa.id_tipo_programa'
      )
      .select([
        'programa.id AS id',
        'programa.id_organizacion AS id_organizacion',
        'organizacion.nombre_organizacion AS nombre_organizacion',
        'programa.id_tipo_programa AS id_tipo_programa',
        'tipo.nombre_tipo AS nombre_tipo',
        'programa.nombre_programa AS nombre_programa',
        'programa.modalidad AS modalidad',
        'programa.fecha_inicio_servicio AS fecha_inicio_servicio',
        'programa.fecha_fin_servicio AS fecha_fin_servicio',
        'programa.lista_actividades AS lista_actividades',
        'programa.plan_trabajo AS plan_trabajo',
      ]);
  }

  async ObtenerTodos(): Promise<SsProgramas[]> {
    const results = await this.ConstruirQuery().getRawMany();
    return results.map(row => this.MapearEntidadADominio(row));
  }

  async ObtenerPorId(id: number): Promise<SsProgramas | null> {
    const row = await this.ConstruirQuery()
      .where('programa.id = :id', { id })
      .getRawOne();

    return row ? this.MapearEntidadADominio(row) : null;
  }

  async ObtenerPorNombrePrograma(nombrePrograma: string): Promise<SsProgramas[]> {
    const results = await this.ConstruirQuery()
      .where('programa.nombre_programa ILIKE :nombrePrograma', { nombrePrograma: `%${nombrePrograma}%` })
      .getRawMany();

    return results.map(row => this.MapearEntidadADominio(row));
  }

  async ObtenerPorOrganizacion(idOrganizacion: number): Promise<SsProgramas[]> {
    const results = await this.ConstruirQuery()
      .where('programa.id_organizacion = :idOrganizacion', { idOrganizacion })
      .getRawMany();

    return results.map(row => this.MapearEntidadADominio(row));
  }

  async ObtenerPorTipoPrograma(idTipoPrograma: number): Promise<SsProgramas[]> {
    const results = await this.ConstruirQuery()
      .where('programa.id_tipo_programa = :idTipoPrograma', { idTipoPrograma })
      .getRawMany();

    return results.map(row => this.MapearEntidadADominio(row));
  }

  async ObtenerPorModalidad(modalidad: boolean): Promise<SsProgramas[]> {
    const results = await this.ConstruirQuery()
      .where('programa.modalidad = :modalidad', { modalidad })
      .getRawMany();

    return results.map(row => this.MapearEntidadADominio(row));
  }

  async ObtenerVigentes(): Promise<SsProgramas[]> {
    const hoy = new Date();
    const results = await this.ConstruirQuery()
      .where('programa.fecha_fin_servicio >= :hoy', { hoy })
      .getRawMany();

    return results.map(row => this.MapearEntidadADominio(row));
  }
    async Eliminar(id: number): Promise<void> {
    await this.ssProgramasRepository.delete(id);
  }

  async Crear(dto: CrearSsProgramaDto, planTrabajo?: Buffer): Promise<SsProgramas> {
    const entity = this.ssProgramasRepository.create({
      id_organizacion: dto.id_organizacion,
      id_tipo_programa: dto.id_tipo_programa,
      nombre_programa: dto.nombre_programa,
      modalidad: dto.modalidad,
      fecha_inicio_servicio: dto.fecha_inicio_servicio ? new Date(dto.fecha_inicio_servicio) : null,
      fecha_fin_servicio: dto.fecha_fin_servicio ? new Date(dto.fecha_fin_servicio) : null,
      lista_actividades: dto.lista_actividades,
      plan_trabajo: planTrabajo ?? null,
    });

    const entityGuardada = await this.ssProgramasRepository.save(entity);

    return this.ObtenerPorId(Number(entityGuardada.id));
  }

}