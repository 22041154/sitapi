import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_alumnos_proyectos', { schema: 'residencias' })
export class ResAlumnosProyectosEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  id_alumno_academico: number;

  @Column({ type: 'bigint' })
  id_proyecto: number;

  @Column({ type: 'varchar', length: 200 })
  nombre_proyecto: string;

  @Column({ type: 'varchar', length: 100 })
  asesor_interno: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  proyecto: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  seguimiento1: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  seguimiento2: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  seguimiento3: string;

  @Column({ type: 'integer', nullable: true })
  calificacion: number;

}