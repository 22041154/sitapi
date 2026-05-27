import {
    IsString,
    IsOptional,
    MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResEmpresaDto {

    @ApiProperty({
        example: 'Microsoft México',
        description: 'Nombre de la empresa',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(200)
    nombre?: string;

    @ApiProperty({
        example: 'Durango, Dgo.',
        description: 'Localización de la empresa',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    localizacion?: string;

}