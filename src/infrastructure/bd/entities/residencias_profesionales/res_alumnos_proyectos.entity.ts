import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity({
    schema: 'residencias',
    name: 'res_alumno_proyecto',
})
export class ResAlumnoProyectoEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'bigint',
    })
    id_proyecto: number;

    @Column({
        type: 'bigint',
    })
    id_alumno_academico: number;

    @Column({
        type: 'bigint',
    })
    id_asesor_interno: number;

    @Column({
        type: 'bigint',
    })
    id_catalogo_dictamen: number;

    @Column({
        type: 'bigint',
    })
    id_periodo_escolar: number;

    @Column({
        type: 'bigint',
    })
    id_revisor: number;

}