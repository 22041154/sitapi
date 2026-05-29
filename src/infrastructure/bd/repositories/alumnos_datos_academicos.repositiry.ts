import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlumnoDatosAcademicosEntity } from '../entities/alumnos_datos_academicos.entity';
import { AlumnosDatosPersonalesEntity } from '../entities/aluumnos_datos_personales.entity';
import { CarrerasEntity } from '../entities/carreras.entity';

import { AlumnoDatosAcademicos } from '../../../dtos/POCOS/alumnos_datos_academicos.entity';
import { DatosLoginAlumno } from '../../../dtos/POCOS/datos_logfn_alumno.poco';

import { IAlumnoDatosAcademicosRepository } from '../../../domain/interfaces/alumnos_datos_academicos.repository.interface';

@Injectable()
export class AlumnoDatosAcademicosRepository
  implements IAlumnoDatosAcademicosRepository {

  constructor(
    @InjectRepository(AlumnoDatosAcademicosEntity)
    private readonly alumnoRepository: Repository<AlumnoDatosAcademicosEntity>,
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

    /*
      TEMPORAL:
      Roles hardcodeados mientras no exista
      tabla usuario ↔ rol en BD.
    */

    let roles: string[] = [];
    let permisos: string[] = [];

    /*
      SUPER ADMIN
    */
    if (
      noControl === 'admin'
      || noControl === '20230001'
    ) {

      roles = ['SUPER_ADMIN'];

      permisos = [
        '*',
      ];

      return {
        roles,
        permisos,
      };
    }

    /*
      ADMIN
    */
    if (
      noControl === '20230002'
    ) {

      roles = ['ADMIN'];

      permisos = [
        'usuarios.read',
        'usuarios.create',
        'usuarios.update',

        'programas.read',
        'programas.create',
        'programas.update',

        'seguimientos.read',
        'seguimientos.update',
      ];

      return {
        roles,
        permisos,
      };
    }

    /*
      ALUMNO
    */
    roles = ['ALUMNO'];

    permisos = [
      'perfil.read',
      'perfil.update',

      'documentos.read',
      'documentos.create',

      'seguimientos.read',
    ];

    return {
      roles,
      permisos,
    };
  }

  async ObtenerNoControlPorId(id: number): Promise<string | null> {
    const entity = await this.alumnoRepository.findOne({
      where: { id },
    });
    return entity ? entity.no_control : null;
  }

}