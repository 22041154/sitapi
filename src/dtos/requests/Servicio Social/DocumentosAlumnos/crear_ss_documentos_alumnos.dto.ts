import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearSsDocumentosAlumnosDto {
  // Ya no se pide en el body, se toma del token
  id_alumno_academico?: string;

  @ApiProperty({ example: '1', description: 'ID del plan de trabajo' })
  @IsNotEmpty()
  @IsString()
  id_plan_trabajo: string;
}