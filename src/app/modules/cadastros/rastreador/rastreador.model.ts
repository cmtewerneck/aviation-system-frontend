import { Entity } from "app/shared/models/entity.model";

export interface Rastreador extends Entity {
    codigo: string;
    modelo: string;
    aeronaveId: string;
}