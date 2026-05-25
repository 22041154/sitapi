import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, MaxLength, Min, Max, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResCalificacionDto {

  @ApiProperty({
    example: 1,
    description: 'Id del alumno proyecto',
    required: false,
  })
  @IsOptional()
  @IsInt()
  id_alumno_proyecto?: number;

  @ApiProperty({
    example: 95,
    description: 'Calificación final de residencia',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  calificacion?: number;

  @ApiProperty({
    example: '2026-05-25',
    description: 'Fecha de captura de la calificación',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiProperty({
    example: true,
    description: 'Indica si la calificación ya fue capturada oficialmente',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  captura?: boolean;

  @ApiProperty({
    example: 'ACTA-RES-2026-001',
    description: 'Folio del acta de residencia',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  folio_acta_residencia?: string;

  @ApiProperty({
    example: 15,
    description: 'Id de la materia',
    required: false,
  })
  @IsOptional()
  @IsInt()
  id_materia?: number;

  @ApiProperty({
    example: 8,
    description: 'Id del grupo',
    required: false,
  })
  @IsOptional()
  @IsInt()
  id_grupo?: number;

}