import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearResResidenciaDto {

  @ApiProperty({
    example: 1,
    description: 'ID del periodo escolar',
  })
  @IsNumber()
  id_periodo_escolar: number;

  @ApiProperty({
    example: 15,
    description: 'ID del alumno académico',
  })
  @IsNumber()
  id_alumno_academico: number;

  @ApiProperty({
    example: 3,
    description: 'ID de la empresa',
  })
  @IsNumber()
  id_empresa: number;

  @ApiProperty({
    example: 8,
    description: 'ID del asesor interno',
  })
  @IsNumber()
  id_asesor_interno: number;

  @ApiProperty({
    example: 'A',
    description: 'Estatus de la residencia',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsIn(['A', 'C', 'T', 'R'])
  @MaxLength(1)
  estatus_residencia?: string;

  @ApiProperty({
    example: 'Sistema web de control escolar',
    description: 'Nombre del proyecto',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  nombre_proyecto?: string;

  @ApiProperty({
    example: 'CARLOS ALBERTO DIAZ',
    description: 'Nombre del asesor externo',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(60)
  nombre_asesor_externo?: string;

  @ApiProperty({
    example: 95,
    description: 'Calificación final',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  calificacion?: number;

  @ApiProperty({
    example: 'ACTA-2026-001',
    description: 'Folio del acta de residencia',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(12)
  folio_acta_residencia?: string;

  @ApiProperty({
    example: 'Residencia concluida satisfactoriamente',
    description: 'Observaciones generales',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  observaciones?: string;

}