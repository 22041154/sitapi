import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISsSeguimientoAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_seguimiento_alumnos.interface';
import { SsSeguimientoAlumnosEntity } from '../../entities/servicio_social/ss_seguimiento_alumnos.entity';
import { SsSeguimientoAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_seguimiento_alumnos.poco';

@Injectable()
export class SsSeguimientoAlumnosRepository implements ISsSeguimientoAlumnosRepository {
  constructor(
    @InjectRepository(SsSeguimientoAlumnosEntity)
    private readonly seguimientoAlumnosRepository: Repository<SsSeguimientoAlumnosEntity>,
  ) {}

  async obtenerTodos(): Promise<SsSeguimientoAlumnosPoco[]> {
    const entidades = await this.seguimientoAlumnosRepository.find();
    return entidades.map((entidad) => {
      const poco = new SsSeguimientoAlumnosPoco();
      poco.id = Number(entidad.id);
      poco.id_alumno_academico = Number(entidad.id_alumno_academico);
      poco.id_programa = Number(entidad.id_programa);
      poco.id_periodo_escolar = Number(entidad.id_periodo_escolar);
      return poco;
    });
  }
}