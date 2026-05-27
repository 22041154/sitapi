import {
    IsString,
    IsNotEmpty,
    MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearResCatalogoDictamenDto {

    @ApiProperty({
        example: 'ACEPTADO',
        description: 'Nombre del dictamen',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nombre: string;

}