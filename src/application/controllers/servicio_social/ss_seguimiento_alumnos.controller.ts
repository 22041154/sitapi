import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../../infrastructure/security/auth/Jwt.guard';
import { ObtenerSsSeguimientoAlumnosUseCase } from '../../logic/servicio_Social/SeguimientoAlumnos/obtener_ss_seguimiento_alumnos';
import { SsSeguimientoAlumnosResponse } from '../../../dtos/responses/servicio_social/ss_seguimiento_alumnos.response';

@ApiTags('Servicio Social - Seguimiento Alumnos')
@Controller('servicio-social/seguimiento-alumnos')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class SsSeguimientoAlumnosController {
  constructor(
    private readonly obtenerSsSeguimientoAlumnosUseCase: ObtenerSsSeguimientoAlumnosUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los seguimientos de alumnos' })
  @ApiResponse({ status: 200, description: 'Lista de seguimientos obtenida exitosamente', type: [SsSeguimientoAlumnosResponse] })
  async obtenerTodos(): Promise<SsSeguimientoAlumnosResponse[]> {
    return await this.obtenerSsSeguimientoAlumnosUseCase.execute();
  }
}