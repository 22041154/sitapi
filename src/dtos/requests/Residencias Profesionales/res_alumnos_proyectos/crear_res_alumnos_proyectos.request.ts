import {
    IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearResAlumnoProyectoDto {

    @ApiProperty({
        example: 1,
        description: 'ID del proyecto',
    })
    @IsNumber()
    id_proyecto: number;

    @ApiProperty({
        example: 10,
        description: 'ID del alumno académico',
    })
    @IsNumber()
    id_alumno_academico: number;

    @ApiProperty({
        example: 5,
        description: 'ID del asesor interno',
    })
    @IsNumber()
    id_asesor_interno: number;

    @ApiProperty({
        example: 2,
        description: 'ID del catálogo de dictamen',
    })
    @IsNumber()
    id_catalogo_dictamen: number;

    @ApiProperty({
        example: 3,
        description: 'ID del periodo escolar',
    })
    @IsNumber()
    id_periodo_escolar: number;

    @ApiProperty({
        example: 7,
        description: 'ID del revisor',
    })
    @IsNumber()
    id_revisor: number;

}