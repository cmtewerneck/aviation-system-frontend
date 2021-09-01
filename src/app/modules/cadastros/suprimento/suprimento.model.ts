import { Entity } from "app/shared/models/entity.model";

export interface Suprimento extends Entity {
    codigo: string;
    partNumber: string;
    nomenclatura: string;
    quantidade: number;
    localizacao: string;
    partNumberAlternativo: string;
    aplicacao: string;
    capitulo: string;
    serialNumber: string;
    doc: string;
    imagem: string;
    
    //movimentacoes: SuprimentoMovimentacao[];
}