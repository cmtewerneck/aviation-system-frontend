import { Entity } from "app/shared/models/entity.model";
import { FormaPagamentoEnum } from "./formaPagamento.enum";

export interface ContaReceber extends Entity {
    tipoFinanceiro: number;
    descricao: string;
    valorReceber?: number;
    valorRecebido?: number;
    dataRecebimento?: Date;
    formaPagamento?: FormaPagamentoEnum;
    situacao: boolean;
}