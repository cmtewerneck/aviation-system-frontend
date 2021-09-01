import { Entity } from "app/shared/models/entity.model";
import { TipoPessoaEnum } from "./tipoPessoa.enum";
import { SexoEnum } from "./sexo.enum";
import { TipoColaboradorEnum } from "./tipoColaborador.enum";
import { TipoVinculoEnum } from "./tipoVinculo.enum";

export interface Instrutor extends Entity {
    nome: string;
    tipoPessoa: TipoPessoaEnum;
    documento: string;
    sexo?: SexoEnum;
    estadoCivil: string;
    telefone: string;
    email: string;
    dataNascimento?: Date;
    dataAdmissao?: Date;
    dataDemissao?: Date;
    validadeCMA?: Date;
    tipoColaborador: TipoColaboradorEnum;
    canac: string;
    salario?: number;
    tipoVinculo: TipoVinculoEnum;
    rg: string;
    orgaoEmissor: string;
    tituloEleitor: string;
    numeroPis: string;
    numeroCtps: string;
    numeroCnh: string;
    imagem: string;
    ativo: boolean;
}