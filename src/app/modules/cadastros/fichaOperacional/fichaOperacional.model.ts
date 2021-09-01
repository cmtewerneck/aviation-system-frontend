import { Entity } from "app/shared/models/entity.model";

export interface FichaOperacional extends Entity {
    numeracao: string;
    descricao: string;
    arquivo: string;
    revisao?: number;
    dataRevisao?: Date;
}