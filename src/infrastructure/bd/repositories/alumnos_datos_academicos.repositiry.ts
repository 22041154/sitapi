import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlumnoDatosAcademicosEntity } from '../entities/alumnos_datos_academicos.entity';
import { AlumnosDatosPersonalesEntity } from '../entities/aluumnos_datos_personales.entity';
import { CarrerasEntity } from '../entities/carreras.entity';
import { SsPermisosEntity } from '../entities/servicio_social/ss_permisos.entity';
import { SsRolesPermisosEntity } from '../entities/servicio_social/ss_roles_permisos.entity';

import { AlumnoDatosAcademicos } from '../../../dtos/POCOS/alumnos_datos_academicos.entity';
import { DatosLoginAlumno } from '../../../dtos/POCOS/datos_logfn_alumno.poco';

import { IAlumnoDatosAcademicosRepository } from '../../../domain/interfaces/alumnos_datos_academicos.repository.interface';

@Injectable()
export class AlumnoDatosAcademicosRepository
  implements IAlumnoDatosAcademicosRepository {

  constructor(
    @InjectRepository(AlumnoDatosAcademicosEntity)
    private readonly alumnoRepository: Repository<AlumnoDatosAcademicosEntity>,

    @InjectRepository(SsPermisosEntity)
    private readonly permisosRepository: Repository<SsPermisosEntity>,

    @InjectRepository(SsRolesPermisosEntity)
    private readonly rolesPermisosRepository: Repository<SsRolesPermisosEntity>,
  ) {}

  private MapearEntidadADominio(
    entity: AlumnoDatosAcademicosEntity,
  ): AlumnoDatosAcademicos {

    return new AlumnoDatosAcademicos(
      entity.id,
      entity.id_alumno_personal,
      entity.no_control,
      entity.nip,
      entity.creditos_aprobados,
    );
  }

  async BuscarPorNoControl(
    noControl: string,
  ): Promise<AlumnoDatosAcademicos | null> {

    const entity = await this.alumnoRepository.findOne({
      where: {
        no_control: noControl,
      },
    });

    return entity
      ? this.MapearEntidadADominio(entity)
      : null;
  }

  async ObtenerDatosLoginPorNoControl(
    noControl: string,
  ): Promise<DatosLoginAlumno | null> {

    const row = await this.alumnoRepository
      .createQueryBuilder('academico')

      .leftJoin(
        AlumnosDatosPersonalesEntity,
        'personal',
        'personal.id = academico.id_alumno_personal',
      )

      .leftJoin(
        CarrerasEntity,
        'carrera',
        'carrera.id = academico.id_carrera',
      )

      .select([
        'academico.no_control AS matricula',
        'academico.creditos_aprobados AS creditos',
        'academico.semestre AS semestre',
        `CONCAT(
          personal.nombre,
          ' ',
          personal.apellido_paterno,
          ' ',
          personal.apellido_materno
        ) AS nombre_completo`,
        'carrera.nombre_completo AS carrera',
      ])

      .where(
        'academico.no_control = :noControl',
        { noControl },
      )

      .getRawOne();

    if (!row) {
      return null;
    }

    return new DatosLoginAlumno(
      row.nombre_completo,
      row.matricula,
      Number(row.creditos),
      row.carrera,
      Number(row.semestre),
    );
  }

  async ObtenerRolesYPermisos(
    noControl: string,
  ): Promise<{
    roles: string[];
    permisos: string[];
  }> {

    const permisos = await this.rolesPermisosRepository
      .createQueryBuilder('rp')

      .innerJoin(
        SsPermisosEntity,
        'p',
        'p.id = rp.id_ss_permiso',
      )

      .select(
        'p.permiso',
        'permiso',
      )

      .where(
        'rp.id_ss_rol = :rolId',
        { rolId: 3 },
      )

      .getRawMany();

    return {
      roles: ['ALUMNO'],
      permisos: permisos.map(
        (permiso) => permiso.permiso,
      ),
    };
  }

  async ObtenerNoControlPorId(
    id: number,
  ): Promise<string | null> {

    const entity = await this.alumnoRepository.findOne({
      where: {
        id,
      },
    });

    return entity
      ? entity.no_control
      : null;
  }

}