import { Entity } from "app/shared/models/entity.model";
import { MesEnum } from "./mes.enum";
import { TipoTrabalhoPapeletaEnum } from "./tipoTrabalhoPapeleta.enum";

export interface Papeleta extends Entity {
    mes: MesEnum;
    ano: number;
    tripulanteId: string;

    itensPapeleta: ItemPapeleta[];
}

export interface ItemPapeleta extends Entity {
    dia: number;
    inicioJornada?: Date;
    CalcosFora?: Date;
    CalcosChegada?: Date;
    InicioAlmoco?: Date;
    TerminoAlmoco?: Date;
    InicioInterrupcaoProgramada?: Date;
    TerminoInterrupcaoProgramada?: Date;
    TerminoJornada?: Date;
    Situacao: TipoTrabalhoPapeletaEnum;
    PapeletaId: string;
}