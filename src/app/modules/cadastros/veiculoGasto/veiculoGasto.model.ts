import { Entity } from "app/shared/models/entity.model";

export interface VeiculoGasto extends Entity {
    data: Date;
    descricao: string;
    situacao: boolean;
    valor: number;
    veiculoId: string;
    placa: string;
}