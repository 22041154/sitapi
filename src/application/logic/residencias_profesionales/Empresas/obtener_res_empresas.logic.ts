import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { IResEmpresasRepository } from '../../../../domain/interfaces/residencias_profesionales/res_empresas.interface';
import { ResEmpresas } from '../../../../dtos/POCOS/residencias_profesionales/res_empresas,poco';

@Injectable()
export class ObtenerResEmpresasUseCase {

    constructor(
        @Inject('IResEmpresasRepository')
        private readonly resEmpresasRepository:
        IResEmpresasRepository,
    ) {}

    async ObtenerTodos(): Promise<ResEmpresas[]> {

        const empresas =
            await this.resEmpresasRepository.ObtenerTodos();

        if (empresas.length === 0) {
            throw new NotFoundException(
                'No se encontraron empresas',
            );
        }

        return empresas;

    }

    async ObtenerPorId(
        id: number,
    ): Promise<ResEmpresas> {

        const empresa =
            await this.resEmpresasRepository.ObtenerPorId(id);

        if (!empresa) {
            throw new NotFoundException(
                `No se encontró la empresa con id ${id}`,
            );
        }

        return empresa;

    }

    async ObtenerPorNombre(
        nombre: string,
    ): Promise<ResEmpresas[]> {

        const empresas =
            await this.resEmpresasRepository.ObtenerPorNombre(
                nombre,
            );

        if (empresas.length === 0) {
            throw new NotFoundException(
                `No se encontraron empresas con el nombre ${nombre}`,
            );
        }

        return empresas;

    }

    async ObtenerPorLocalizacion(
        localizacion: string,
    ): Promise<ResEmpresas[]> {

        const empresas =
            await this.resEmpresasRepository.ObtenerPorLocalizacion(
                localizacion,
            );

        if (empresas.length === 0) {
            throw new NotFoundException(
                `No se encontraron empresas en la localización ${localizacion}`,
            );
        }

        return empresas;

    }

}