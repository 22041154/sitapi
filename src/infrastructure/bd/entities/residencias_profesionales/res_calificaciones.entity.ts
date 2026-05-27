import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['id_alumno_proyecto'])
@Entity('res_calificaciones', { schema: 'residencias' })
export class ResCalificacionesEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  id_alumno_proyecto: number;

  @Column({ type: 'integer', nullable: true })
  calificacion: number;

  @Column({ type: 'date', nullable: true })
  fecha: Date;

  @Column({ type: 'boolean', nullable: true })
  captura: boolean;

  @Column({ type: 'varchar', length: 30, nullable: true })
  folio_acta_residencia: string;

  @Column({ type: 'bigint', nullable: true })
  id_materia: number;

  @Column({ type: 'bigint', nullable: true })
  id_grupo: number;

}