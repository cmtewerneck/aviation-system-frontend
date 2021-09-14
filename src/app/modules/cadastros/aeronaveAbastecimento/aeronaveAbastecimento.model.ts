import { Entity } from "app/shared/models/entity.model";

export interface AeronaveAbastecimento extends Entity {
    data: Date;
    litros: number;
    local: string;
    cupom: string;
    notaFiscal: string;
    fornecedora: string;
    responsavel: string;
    valor?: number;
    observacoes: string;
    comprovante: string;
    comprovanteUpload: string;
    aeronaveId: string;
}