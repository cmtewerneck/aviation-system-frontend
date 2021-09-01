import { Entity } from "app/shared/models/entity.model";

export interface ListaPassageiro extends Entity {
    data: Date;
    origem: string;
    destino: string;
    aeronaveId: string;
    comandanteId: string;

    passageiros: Passageiro[];
}

export interface Passageiro extends Entity {
    nome: string;
    documento: string;
    peso?: number;
    telefone: string;
    email: string;
    nomeEmergencia: string;
    telefoneEmergencia: string;
}