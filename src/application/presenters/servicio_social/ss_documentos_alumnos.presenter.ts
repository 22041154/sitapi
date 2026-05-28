import { SsDocumentosAlumnosPoco } from '../../../dtos/POCOS/servicio_social/ss_documentos_alumnos.poco';
import { SsDocumentosAlumnosResponse } from '../../../dtos/responses/servicio_social/ss_documentos_alumnos.response';

export class SsDocumentosAlumnosPresenter {

  static Presentar(poco: SsDocumentosAlumnosPoco): SsDocumentosAlumnosResponse {
    const response = new SsDocumentosAlumnosResponse();
    response.id                  = poco.id;
    response.id_alumno_academico = poco.id_alumno_academico;
    response.id_plan_trabajo     = poco.id_plan_trabajo;
    response.carta_presentacion  = poco.carta_presentacion  ?? null;
    response.carta_compromiso    = poco.carta_compromiso    ?? null;
    response.carta_aceptacion    = poco.carta_aceptacion    ?? null;
    response.seguro_facultativo  = poco.seguro_facultativo  ?? null;
    return response;
  }

  static PresentarLista(pocos: SsDocumentosAlumnosPoco[]): SsDocumentosAlumnosResponse[] {
    return pocos.map(poco => this.Presentar(poco));
  }
}