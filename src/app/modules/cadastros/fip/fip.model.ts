import { Entity } from "app/shared/models/entity.model";

export interface Fip extends Entity {
    fase: string;
    licao: string;
    tempoPrevisto: Date;
    cursoId: string;

    itensFip: ItemFip[];
}

export interface ItemFip extends Entity {
    exercicio: string;
    proficienciaAceitavel: string;
}