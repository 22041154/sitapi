import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResDocumentosResidenciasDto {

  @ApiProperty({
    example: 15,
    description: 'ID del alumno académico',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_alumno_academico?: number;

  @ApiProperty({
    example: 2,
    description: 'ID del tipo de documento',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_tipo_documento?: number;

  @ApiProperty({
    example: 'SI',
    description: 'Indicador de anteproyecto',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  anteproyecto?: string;

  @ApiProperty({
    example: 'SI',
    description: 'Indicador de seguro',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  seguro?: string;

  @ApiProperty({
    example: 'SI',
    description: 'Indicador de carta',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  carta?: string;

}