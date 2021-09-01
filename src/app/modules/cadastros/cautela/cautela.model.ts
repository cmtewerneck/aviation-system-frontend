import { Entity } from "app/shared/models/entity.model";
import { StatusCautelaEnum } from "./statusCautela.enum";

export interface Cautela extends Entity {
    dataAbertura: Date;
    responsavel: string;
    destinatario: string;

    itensCautela: ItemCautela[];
}

export interface ItemCautela extends Entity {
    dataEntrega: Date;
    dataDevolucao?: Date;
    quantidade: number;
    status: StatusCautelaEnum;
    ferramentaId: string;
}