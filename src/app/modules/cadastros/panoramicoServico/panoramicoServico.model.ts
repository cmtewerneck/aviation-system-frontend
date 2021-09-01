import { Entity } from "app/shared/models/entity.model";

export interface PanoramicoServico extends Entity {
    duracao: number;
    preco: number;
    aeronaveId: string;
}