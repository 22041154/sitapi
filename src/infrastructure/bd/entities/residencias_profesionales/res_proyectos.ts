import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ResEmpresasEntity } from './res_empresas';

@Entity('res_proyectos', { schema: 'residencias' })
export class ResProyectosEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  id_empresa: number;

  @Column({ type: 'bigint' })
  id_carrera: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  asesor_externo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  celular: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  correo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  anteproyecto: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  carta_aceptacion: string;

  @ManyToOne(() => ResEmpresasEntity)
  @JoinColumn({ name: 'id_empresa' })
  empresa: ResEmpresasEntity;

}