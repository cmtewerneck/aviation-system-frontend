import { Entity } from "app/shared/models/entity.model";
import { TipoTreinamentoEnum } from "./tipoTreinamento.enum";

export interface CategoriaTreinamento extends Entity {
    codigo: string;
    descricao: string;
    tipoTreinamento: TipoTreinamentoEnum;
    cargaHoraria: number;
}