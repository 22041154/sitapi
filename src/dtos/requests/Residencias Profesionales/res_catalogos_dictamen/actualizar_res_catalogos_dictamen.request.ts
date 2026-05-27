import {
    IsString,
    IsOptional,
    MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResCatalogoDictamenDto {

    @ApiProperty({
        example: 'ACEPTADO',
        description: 'Nombre del dictamen',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    nombre?: string;

}