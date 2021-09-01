import { Entity } from "app/shared/models/entity.model";
import { FormaPagamentoEnum } from "./formaPagamento.enum";

export interface ContaPagar extends Entity {
    tipoFinanceiro: number;
    descricao: string;
    dataVencimento?: Date;
    codigoBarras: string;
    valorPagar?: number;
    valorPago?: number;
    dataPagamento?: Date;
    formaPagamento?: FormaPagamentoEnum;
    situacao: boolean;
    contratoId: string;
}