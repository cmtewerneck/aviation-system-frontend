import { Entity } from "app/shared/models/entity.model";
import { FormaPagamentoEnum } from "./formaPagamento.enum";

export interface PassagemAerea extends Entity {
    dataCompra: Date;
    dataVoo: Date;
    valor: number;
    empresa: string;
    origem: string;
    destino: string;
    formaPagamento?: FormaPagamentoEnum;
    assento: string;
    localizador: string;
    link: string;
    colaboradorId: string;
}