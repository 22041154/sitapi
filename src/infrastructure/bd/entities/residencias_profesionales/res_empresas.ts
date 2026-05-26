import { Entity, Column, PrimaryGeneratedColumn, Unique, } from 'typeorm';

@Unique(['nombre', 'localizacion'])
@Entity('res_empresas', { schema: 'residencias' })
export class ResEmpresasEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    localizacion: string;

}