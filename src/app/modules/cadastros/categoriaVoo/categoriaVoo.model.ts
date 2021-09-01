import { Entity } from "app/shared/models/entity.model";

export interface CategoriaVoo extends Entity {
    codigo: string;
    descricao: string;
}