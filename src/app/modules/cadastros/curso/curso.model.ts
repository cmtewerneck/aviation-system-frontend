import { Entity } from "app/shared/models/entity.model";

export interface Curso extends Entity {
    codigo: string;
    descricao: string;
}