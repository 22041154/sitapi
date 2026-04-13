import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check } from 'typeorm';
import { ResEmpresasEntity } from './res_empresas';

@Check(`"estatus_residencia" IN ('A', 'C', 'T', 'R')`)
@Entity('res_residencias', { schema: 'residencias' })
export class ResResidenciasEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  id_periodo_escolar: number;

  @Column({ type: 'bigint' })
  id_alumno_academico: number;

  @Column({ type: 'bigint' })
  id_empresa: number;

  @Column({ type: 'bigint' })
  id_asesor_interno: number;

  @Column({ type: 'varchar', length: 1, nullable: true })
  estatus_residencia: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  nombre_proyecto: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  nombre_asesor_externo: string;

  @Column({ type: 'integer', nullable: true })
  calificacion: number;

  @Column({ type: 'varchar', length: 12, nullable: true })
  folio_acta_residencia: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observaciones: string;

  @ManyToOne(() => ResEmpresasEntity)
  @JoinColumn({ name: 'id_empresa' })
  empresa: ResEmpresasEntity;

}