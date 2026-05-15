import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearResAsesorIntProyectoDto {

  @ApiProperty({
    example: 1,
    description: 'ID del proyecto',
  })
  @IsNumber()
  id_proyecto: number;

  @ApiProperty({
    example: 20,
    description: 'ID del personal académico',
  })
  @IsNumber()
  id_personal_academico: number;

}