import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('periodos_escolares', { schema: 'catalogos' })
export class PeriodosEscolaresEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  periodo: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  identificacion_larga: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  identificacion_corta: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  status: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date;
}