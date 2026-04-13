import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ResProyectosEntity } from './res_proyectos';

@Entity('res_asesor_int_proyectos', { schema: 'residencias' })
export class ResAsesorIntProyectosEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  id_proyecto: number;

  @Column({ type: 'bigint' })
  id_personal_academico: number;

  @ManyToOne(() => ResProyectosEntity)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto: ResProyectosEntity;

}