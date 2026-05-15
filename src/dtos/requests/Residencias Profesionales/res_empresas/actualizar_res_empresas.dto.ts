import {
  IsString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResEmpresaDto {

  @ApiProperty({
    example: 'Tech Solutions SA de CV',
    description: 'Nombre de la empresa',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  nombre_empresa?: string;

  @ApiProperty({
    example: 'JUAN PEREZ LOPEZ',
    description: 'Nombre del responsable',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  responsable?: string;

  @ApiProperty({
    example: '6181234567',
    description: 'Número telefónico de contacto',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({
    example: 'empresa@gmail.com',
    description: 'Correo electrónico',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  correo?: string;

  @ApiProperty({
    example: 'Durango, Dgo.',
    description: 'Dirección o localización de la empresa',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  localizacion?: string;

}