import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('res_documentos_residencias', { schema: 'residencias' })
export class ResDocumentosResidenciasEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  id_alumno_academico: number;

  @Column({ type: 'bigint' })
  id_tipo_documento: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  fecha_subida: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  anteproyecto: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  seguro: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  carta: string;

}