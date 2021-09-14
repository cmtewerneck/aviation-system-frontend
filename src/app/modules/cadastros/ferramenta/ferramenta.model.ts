import { Entity } from "app/shared/models/entity.model";

export interface Ferramenta extends Entity {
    partNumber: string;
    nomenclatura: string;
    quantidade: number;
    aferivel: boolean;
    ultimaAfericao?: Date;
    proximaAfericao?: Date;
    imagem: string;
    imagemUpload: string;
    localizacao: string;
}