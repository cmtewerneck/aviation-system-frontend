import { Entity } from "app/shared/models/entity.model";

export interface Contrato extends Entity {
    codigo: string;
    descricao: string;
    local: string;
    contratante: string;
    inicio?: Date;
    termino?: Date;
    valor?: number;
    ativo: boolean;
    arquivo: string;

    aeronavesContratos: Aeronave[];
    pessoasContratos: Pessoa[];
}

export interface Pessoa extends Entity {
    pessoaId: string;
}

export interface Aeronave extends Entity {
    aeronaveId: string;
}