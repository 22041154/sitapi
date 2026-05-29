import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISsProgramasRepository } from '../../../../domain/interfaces/servicio_social/ss_programas.interface';
import { IStorageService, STORAGE_SERVICE } from '../../../../domain/interfaces/storage.interface';
import { SsProgramasPoco } from '../../../../dtos/POCOS/servicio_social/ss_programas.poco';

@Injectable()
export class ObtenerSsProgramas {

  constructor(
    @Inject('ISsProgramasRepository')
    private readonly ssProgramasRepository: ISsProgramasRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  // Convierte el path guardado en PostgreSQL a URL temporal de descarga
  private async resolverUrl(programa: SsProgramasPoco): Promise<SsProgramasPoco> {
    const bucket = process.env.GARAGE_BUCKET_SERVICIO_SOCIAL;

    const plan_trabajo_url = programa.plan_trabajo
      ? await this.storageService.getPresignedUrl(bucket, programa.plan_trabajo)
      : null;

    return new SsProgramasPoco(
      programa.id,
      programa.idOrganizacion,
      programa.nombreOrganizacion,
      programa.idTipoPrograma,
      programa.nombreTipo,
      programa.nombrePrograma,
      programa.listaActividades,
      programa.modalidad,
      programa.fechaInicioServicio,
      programa.fechaFinServicio,
      plan_trabajo_url,
    );
  }

  async ObtenerTodos(): Promise<SsProgramasPoco[]> {
    const programas = await this.ssProgramasRepository.ObtenerTodos();

    if (!programas || programas.length === 0) {
      throw new NotFoundException('No se encontraron programas');
    }

    return Promise.all(programas.map(p => this.resolverUrl(p)));
  }

  async ObtenerPorId(id: number): Promise<SsProgramasPoco> {
    const programa = await this.ssProgramasRepository.ObtenerPorId(id);

    if (!programa) {
      throw new NotFoundException(`No se encontró el programa con id ${id}`);
    }

    return this.resolverUrl(programa);
  }

  async ObtenerPorNombrePrograma(nombrePrograma: string): Promise<SsProgramasPoco[]> {
    const programas = await this.ssProgramasRepository.ObtenerPorNombrePrograma(nombrePrograma);

    if (!programas || programas.length === 0) {
      throw new NotFoundException(`No se encontraron programas con el nombre ${nombrePrograma}`);
    }

    return Promise.all(programas.map(p => this.resolverUrl(p)));
  }

  async ObtenerPorOrganizacion(idOrganizacion: number): Promise<SsProgramasPoco[]> {
    const programas = await this.ssProgramasRepository.ObtenerPorOrganizacion(idOrganizacion);

    if (!programas || programas.length === 0) {
      throw new NotFoundException(`No se encontraron programas para la organización con id ${idOrganizacion}`);
    }

    return Promise.all(programas.map(p => this.resolverUrl(p)));
  }

  async ObtenerPorTipoPrograma(idTipoPrograma: number): Promise<SsProgramasPoco[]> {
    const programas = await this.ssProgramasRepository.ObtenerPorTipoPrograma(idTipoPrograma);

    if (!programas || programas.length === 0) {
      throw new NotFoundException(`No se encontraron programas para el tipo con id ${idTipoPrograma}`);
    }

    return Promise.all(programas.map(p => this.resolverUrl(p)));
  }

  async ObtenerPorModalidad(modalidad: boolean): Promise<SsProgramasPoco[]> {
    const programas = await this.ssProgramasRepository.ObtenerPorModalidad(modalidad);

    if (!programas || programas.length === 0) {
      throw new NotFoundException('No se encontraron programas con esa modalidad');
    }

    return Promise.all(programas.map(p => this.resolverUrl(p)));
  }

  async ObtenerVigentes(): Promise<SsProgramasPoco[]> {
    const programas = await this.ssProgramasRepository.ObtenerVigentes();

    if (!programas || programas.length === 0) {
      throw new NotFoundException('No se encontraron programas vigentes');
    }

    return Promise.all(programas.map(p => this.resolverUrl(p)));
  }
}