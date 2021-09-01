import { Entity } from "app/shared/models/entity.model";
import { TipoMovimentacaoEnum } from "./tipoMovimentacao.enum";

export interface SuprimentoMovimentacao extends Entity {
    data: Date;
    quantidade: number;
    tipoMovimentacao: TipoMovimentacaoEnum;
    itemId: string;
}