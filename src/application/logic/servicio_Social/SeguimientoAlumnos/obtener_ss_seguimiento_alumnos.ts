import { Inject, Injectable } from '@nestjs/common';
import { ISS_SEGUIMIENTO_ALUMNOS_REPOSITORY, ISsSeguimientoAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_seguimiento_alumnos.interface';
import { SsSeguimientoAlumnosResponse } from '../../../../dtos/responses/servicio_social/ss_seguimiento_alumnos.response';

@Injectable()
export class ObtenerSsSeguimientoAlumnosUseCase {
  constructor(
    @Inject(ISS_SEGUIMIENTO_ALUMNOS_REPOSITORY)
    private readonly seguimientoAlumnosRepository: ISsSeguimientoAlumnosRepository,
  ) {}

  async execute(): Promise<SsSeguimientoAlumnosResponse[]> {
    const pocos = await this.seguimientoAlumnosRepository.obtenerTodos();
    
    return pocos.map((poco) => {
      const response = new SsSeguimientoAlumnosResponse();
      response.id = poco.id;
      response.id_alumno_academico = poco.id_alumno_academico;
      response.id_programa = poco.id_programa;
      response.id_periodo_escolar = poco.id_periodo_escolar;
      return response;
    });
  }
}