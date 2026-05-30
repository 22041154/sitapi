import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarSsDocumentosAlumnosDto {
  @ApiProperty({ 
    example: '1', 
    description: 'ID del plan de trabajo', 
    required: false 
  })
  @IsOptional()
  @IsString()
  id_plan_trabajo?: string;
}