import { Entity } from "app/shared/models/entity.model";
import { TipoPessoaEnum } from "./tipoPessoa.enum";

export interface Fornecedor extends Entity {
    nome: string;
    tipoPessoa: TipoPessoaEnum;
    documento: string;
    telefone: string;
    email: string;
    ativo: boolean;
    arquivo: string;
    arquivoUpload: string;
}