import { Entity } from "app/shared/models/entity.model";
import { FormaPagamentoEnum } from "./formaPagamento.enum";
import { SituacaoPagamentoEnum } from "./situacaoPagamento.enum";

export interface Diaria extends Entity {
    data: Date;
    valor: number;
    finalidade: string;
    status: SituacaoPagamentoEnum;
    formaPagamento?: FormaPagamentoEnum;
    colaboradorId: string;
    contratoId: string;
}