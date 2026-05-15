import {
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResAsesorIntProyectoDto {

  @ApiProperty({
    example: 1,
    description: 'ID del proyecto',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_proyecto?: number;

  @ApiProperty({
    example: 20,
    description: 'ID del personal académico',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_personal_academico?: number;

}