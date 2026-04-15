import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISsSeguimientoAlumnosRepository } from '../../../../domain/interfaces/servicio_social/ss_seguimiento_alumnos.interface';
import { SsSeguimientoAlumnosEntity } from '../../entities/servicio_social/ss_seguimiento_alumnos.entity';
import { SsSeguimientoAlumnosPoco } from '../../../../dtos/POCOS/servicio_social/ss_seguimiento_alumnos.poco';
import { CrearSsSeguimientoAlumnosDto } from '../../../../dtos/requests/Servicio Social/SeguimientoAlumnos/crear_ss_seguimiento_alumnos.dto';

@Injectable()
export class SsSeguimientoAlumnosRepository implements ISsSeguimientoAlumnosRepository {
  constructor(
    @InjectRepository(SsSeguimientoAlumnosEntity)
    private readonly seguimientoAlumnosRepository: Repository<SsSeguimientoAlumnosEntity>,
  ) {}

  private mapToPoco(entidad: SsSeguimientoAlumnosEntity): SsSeguimientoAlumnosPoco {
    const poco = new SsSeguimientoAlumnosPoco();
    poco.id = Number(entidad.id);
    poco.id_alumno_academico = Number(entidad.id_alumno_academico);
    poco.id_programa = Number(entidad.id_programa);
    poco.id_periodo_escolar = Number(entidad.id_periodo_escolar);
    return poco;
  }

  async ObtenerTodos(): Promise<SsSeguimientoAlumnosPoco[]> {
    const entidades = await this.seguimientoAlumnosRepository.find();
    return entidades.map(this.mapToPoco);
  }

  async ObtenerPorId(id: number): Promise<SsSeguimientoAlumnosPoco | null> {
    const entidad = await this.seguimientoAlumnosRepository.findOne({ where: { id } });
    return entidad ? this.mapToPoco(entidad) : null;
  }

  async ObtenerPorIdAlumnoAcademico(id_alumno_academico: number): Promise<SsSeguimientoAlumnosPoco[]> {
    const entidades = await this.seguimientoAlumnosRepository.find({ where: { id_alumno_academico } });
    return entidades.map(this.mapToPoco);
  }

  async ObtenerPorIdPrograma(id_programa: number): Promise<SsSeguimientoAlumnosPoco[]> {
    const entidades = await this.seguimientoAlumnosRepository.find({ where: { id_programa } });
    return entidades.map(this.mapToPoco);
  }
  async Crear(dto: CrearSsSeguimientoAlumnosDto): Promise<SsSeguimientoAlumnosPoco> {
    const entity = this.seguimientoAlumnosRepository.create({
      id_alumno_academico: dto.id_alumno_academico,
      id_programa: dto.id_programa,
      id_periodo_escolar: dto.id_periodo_escolar,
    });
    
    const entityGuardada = await this.seguimientoAlumnosRepository.save(entity);
    return this.mapToPoco(entityGuardada);
  }
  async Eliminar(id: number): Promise<void> {
    await this.seguimientoAlumnosRepository.delete(id); 
  }
}