import {
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResSeguimientoDto {

    @ApiProperty({
        example: 1,
        description: 'ID del alumno proyecto',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    id_alumno_proyecto?: number;

    @ApiProperty({
        example: 'APROBADO',
        description: 'Primer seguimiento',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    primer_seguimiento?: string;

    @ApiProperty({
        example: 'APROBADO',
        description: 'Segundo seguimiento',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    segundo_seguimiento?: string;

    @ApiProperty({
        example: 'APROBADO',
        description: 'Tercer seguimiento',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    tercer_seguimiento?: string;

    @ApiProperty({
        example: 'ENTREGADO',
        description: 'Portada del anteproyecto',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    port_antproyecto?: string;

    @ApiProperty({
        example: 'VALIDADO',
        description: 'Documento interno',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    doc_interno?: string;

    @ApiProperty({
        example: 'ENTREGADO',
        description: 'Reporte final',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    reporte_final?: string;

    @ApiProperty({
        example: 'REVISADO',
        description: 'Revisión final',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    revicion_final?: string;

    @ApiProperty({
        example: 'RECIBIDA',
        description: 'Acta recibida',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    acta_reciv?: string;

    @ApiProperty({
        example: 'ENTREGADA',
        description: 'Acta entregada',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(14)
    acta_entreg?: string;

}