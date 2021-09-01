import { Entity } from "app/shared/models/entity.model";

export interface Servico extends Entity {
    codigo: string;
    titulo: string;
    custo?: number;
}