import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity({
    schema: 'residencias',
    name: 'res_seguimientos',
})
export class ResSeguimientosEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'bigint',
        unique: true,
    })
    id_alumno_proyecto: number;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    primer_seguimiento?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    segundo_seguimiento?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    tercer_seguimiento?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    port_antproyecto?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    doc_interno?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    reporte_final?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    revicion_final?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    acta_reciv?: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: true,
    })
    acta_entreg?: string;

}