import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IniciarSesionDto {

  @ApiProperty({ 
    example: '00040125', 
    description: 'Número de control del alumno' 
  })
  @IsString()
  @IsNotEmpty()
  no_control: string;

  @ApiProperty({ 
    example: '1234', 
    description: 'NIP del alumno' 
  })
  @IsString()
  @IsNotEmpty()
  nip: string;

}