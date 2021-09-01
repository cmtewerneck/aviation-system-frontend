import { Entity } from "app/shared/models/entity.model";
import { TipoAeronaveEnum } from "./tipoAeronave.enum";

export interface Aeronave extends Entity {
    matricula: string;
    fabricante: string;
    categoria: string;
    modelo: string;
    numeroSerie: string;
    ano?: number;
    pesoVazio?: number;
    pesoBasico?: number;
    horasTotais: number;
    proximaIntervencao: number;
    horasRestantes?: number;
    tipoAeronave: TipoAeronaveEnum;
    ultimaPesagem?: Date;
    proximaPesagem?: Date;
    ativo: boolean;
    situacao: boolean;
    imagem: string;

    aeronavesDocumentos: AeronaveDocumento[];
    aeronavesMotores: AeronaveMotor[];
    primeirosSocorros: PrimeiroSocorro[];
    rotoresPrincipais: AeronaveRotorPrincipal[];
    rotoresCauda: AeronaveRotorCauda[];
}

export interface AeronaveDocumento extends Entity {
    titulo: string;
    dataEmissao?: Date;
    dataValidade: Date;
    arquivo: string;
}

export interface AeronaveMotor extends Entity {
    fabricante: string;
    modelo: string;
    numeroSerie: string;
    horasTotais?: number;
    ciclosTotais?: number;
}

export interface PrimeiroSocorro extends Entity {
    descricao: string;
    tipo: string;
    quantidade: number;
    dataCompra?: Date;
    dataValidade: Date;
}

export interface AeronaveRotorPrincipal extends Entity {
    partNumber: string;
    numeroSerie: string;
    horasTotais?: number;
    ciclosTotais?: number;
}

export interface AeronaveRotorCauda extends Entity {
    partNumber: string;
    numeroSerie: string;
    horasTotais?: number;
    ciclosTotais?: number;
}