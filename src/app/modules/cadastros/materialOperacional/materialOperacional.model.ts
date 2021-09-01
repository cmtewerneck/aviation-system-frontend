import { Entity } from "app/shared/models/entity.model";

export interface MaterialOperacional extends Entity {
    partNumber: string;
    serialNumber: string;
    descricao: string;
    modeloAeronave: string;
    localizacao: string;
    quantidade: number;
    imagem: string;
}