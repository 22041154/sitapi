import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('res_catalogo_dictamen', {
    schema: 'residencias',
})
export class ResCatalogoDictamenEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    nombre: string;

}