import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ISsOrganizacionesRepository } from '../../../../domain/interfaces/servicio_social/ss_organizaciones';
import { ActualizarSsOrganizacionDto } from '../../../../dtos/requests/Servicio Social/Organizaciones/Actualizar_Organizaciones_DTO';
import { SsOrganizaciones } from '../../../../dtos/POCOS/servicio_social/ss_organizaciones.poco';

@Injectable()
export class ActualizarSsOrganizacionUseCase {

  constructor(
    @Inject('ISsOrganizacionesRepository')
    private readonly ssOrganizacionesRepository: ISsOrganizacionesRepository,
  ) {}

  async Ejecutar(id: number, dto: ActualizarSsOrganizacionDto): Promise<SsOrganizaciones> {

    const organizacionExistente = await this.ssOrganizacionesRepository.ObtenerPorId(id);

    if (!organizacionExistente) {
      throw new NotFoundException(`No se encontró la organización con id ${id}`);
    }

    if (dto.nombre_organizacion) {
      const organizacionesConMismoNombre = await this.ssOrganizacionesRepository
        .ObtenerPorNombreOrganizacion(dto.nombre_organizacion);

      const existeConflicto = organizacionesConMismoNombre.some(
        org =>
          org.nombreOrganizacion.toLowerCase() === dto.nombre_organizacion.toLowerCase() &&
          org.id !== id
      );

      if (existeConflicto) {
        throw new ConflictException(`Ya existe una organización con el nombre ${dto.nombre_organizacion}`);
      }
    }

    return this.ssOrganizacionesRepository.Actualizar(id, dto);
  }

}