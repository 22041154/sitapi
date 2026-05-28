import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ss_documentos_alumnos', schema: 'servicio_social' })
export class SsDocumentosAlumnosEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'id_alumno_academico' })
  id_alumno_academico: number;

  @Column({ type: 'bigint', name: 'id_plan_trabajo' })
  id_plan_trabajo: number;

  @Column({ type: 'text', nullable: true })
  carta_presentacion: string;

  @Column({ type: 'text', nullable: true })
  carta_compromiso: string;

  @Column({ type: 'text', nullable: true })
  carta_aceptacion: string;

  @Column({ type: 'text', nullable: true })
  seguro_facultativo: string;
}