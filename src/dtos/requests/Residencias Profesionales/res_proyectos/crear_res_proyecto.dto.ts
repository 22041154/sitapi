import {
    IsString,
    IsNotEmpty,
    IsNumber,
    MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearResProyectoDto {

    @ApiProperty({
        example: 1,
        description: 'ID de la empresa',
    })
    @IsNumber()
    id_empresa: number;

    @ApiProperty({
        example: 'RES-2026-001',
        description: 'Folio del proyecto',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    folio: string;

    @ApiProperty({
        example: 'Sistema de gestión de residencias',
        description: 'Nombre del proyecto',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    nombre: string;

    @ApiProperty({
        example: 'JUAN PEREZ LOPEZ',
        description: 'Nombre del asesor externo',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    nombre_asesor_externo: string;

    @ApiProperty({
        example: 'Gerente de TI',
        description: 'Puesto del asesor externo',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    puesto_asesor_externo: string;

    @ApiProperty({
        example: '6181234567 ext 102',
        description: 'Teléfono y extensión del asesor externo',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    telefono_y_extension: string;

    @ApiProperty({
        example: 2,
        description: 'Clave del área',
    })
    @IsNumber()
    id_clave_area: number;

}