import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['nombre_empresa'])
@Entity('res_empresas', { schema: 'residencias' })
export class ResEmpresasEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  nombre_empresa: string;

  @Column({ type: 'varchar', length: 100 })
  responsable: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  correo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  localizacion: string;

}