import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarResProyectoDto {

  @ApiProperty({
    example: 1,
    description: 'ID de la empresa',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_empresa?: number;

  @ApiProperty({
    example: 3,
    description: 'ID de la carrera',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_carrera?: number;

  @ApiProperty({
    example: 'Sistema de gestión para residencias profesionales',
    description: 'Descripción del proyecto',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    example: 'MARIA FERNANDA DIAZ',
    description: 'Nombre del asesor externo',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  asesor_externo?: string;

  @ApiProperty({
    example: '6189876543',
    description: 'Número celular del asesor externo',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  celular?: string;

  @ApiProperty({
    example: 'asesor@gmail.com',
    description: 'Correo electrónico del asesor externo',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  correo?: string;

  @ApiProperty({
    example: 'anteproyecto.pdf',
    description: 'Nombre del archivo del anteproyecto',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  anteproyecto?: string;

  @ApiProperty({
    example: 'carta_aceptacion.pdf',
    description: 'Nombre del archivo de carta de aceptación',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  carta_aceptacion?: string;

}