import { Entity } from "app/shared/models/entity.model";

export interface VeiculoMulta extends Entity {
    data: Date;
    autoInfracao: string;
    responsavel: string;
    classificacao: string;
    descricao: string;
    situacao: boolean;
    valor?: number;
    veiculoId: string;
    placa: string;
}