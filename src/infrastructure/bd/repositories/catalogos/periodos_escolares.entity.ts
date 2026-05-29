import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodosEscolaresEntity } from '../../entities/catalogos/periodos_escolares.entity';

@Injectable()
export class PeriodosEscolaresRepository {
  constructor(
    @InjectRepository(PeriodosEscolaresEntity)
    private readonly periodosRepository: Repository<PeriodosEscolaresEntity>,
  ) {}

  async ObtenerPeriodoActivo(): Promise<string> {
    const periodo = await this.periodosRepository.findOne({
      where: { status: '1' },
      order: { fecha_inicio: 'DESC' }, // ← el periodo activo más reciente
    });

    if (!periodo) {
      throw new NotFoundException('No se encontró un periodo escolar activo');
    }

    return periodo.identificacion_corta ?? periodo.periodo;
  }
}