import {
    IsNumber,
    IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResAlumnoProyectoDto {

    @ApiProperty({
        example: 1,
        description: 'ID del proyecto',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    id_proyecto?: number;

    @ApiProperty({
        example: 10,
        description: 'ID del alumno académico',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    id_alumno_academico?: number;

    @ApiProperty({
        example: 5,
        description: 'ID del asesor interno',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    id_asesor_interno?: number;

    @ApiProperty({
        example: 2,
        description: 'ID del catálogo de dictamen',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    id_catalogo_dictamen?: number;

    @ApiProperty({
        example: 3,
        description: 'ID del periodo escolar',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    id_periodo_escolar?: number;

    @ApiProperty({
        example: 7,
        description: 'ID del revisor',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    id_revisor?: number;

}