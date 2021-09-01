import { Entity } from "app/shared/models/entity.model";

export interface Revendedor extends Entity {
    empresa: string;
    cnpj: string;
    responsavel: string;
}