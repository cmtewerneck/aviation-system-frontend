import { Entity } from "app/shared/models/entity.model";
import { TipoTreinamentoEnum } from "./tipoTreinamento.enum";
import { SituacaoTreinamentoEnum } from "./situacaoTreinamento.enum";

export interface Nrt extends Entity {
    numero: string;
    funcao: string;
    habilitacao: string;
    tipoTreinamento: TipoTreinamentoEnum;
    dataInicio: Date;
    dataTermino: Date;
    validade: Date;
    situacaoTreinamento: SituacaoTreinamentoEnum;

    pessoas: Pessoa[];
    categorias: Categoria[];
}

export interface Pessoa extends Entity {
    pessoaId: string;
}

export interface Categoria extends Entity {
    categoriaId: string;
    inicio?: Date;
    termino?: Date;
    instrutor: string;
}