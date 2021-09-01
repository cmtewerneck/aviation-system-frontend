import { Entity } from "app/shared/models/entity.model";
import { StatusIsencaoEnum } from "./statusIsencao.enum";
import { TipoIsencaoEnum } from "./tipoIsencao.enum";

export interface Ise extends Entity {
    dataCriacao: Date;
    dataEnvio?: Date;
    responsavel: string;
    canac: string;

    itensIse: ItemIse[];
}

export interface ItemIse extends Entity {
    tipoIsencao: TipoIsencaoEnum;
    aeronaveId: string;
    origem: string;
    dataHora: Date;
    status: StatusIsencaoEnum;
}