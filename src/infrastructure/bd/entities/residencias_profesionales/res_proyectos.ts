import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('res_proyectos', {
    schema: 'residencias',
})
export class ResProyectosEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'bigint',
    })
    id_empresa: number;

    @Column({
        type: 'varchar',
        length: 20,
    })
    folio: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    nombre_asesor_externo: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    puesto_asesor_externo: string;

    @Column({
        type: 'varchar',
        length: 20,
    })
    telefono_y_extension: string;

    @Column({
        type: 'bigint',
    })
    id_clave_area: number;

}