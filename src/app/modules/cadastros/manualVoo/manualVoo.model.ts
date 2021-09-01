import { Entity } from "app/shared/models/entity.model";

export interface ManualVoo extends Entity {
    modeloAeronave: string;
    arquivo: string;
    ultimaRevisao?: Date;
}