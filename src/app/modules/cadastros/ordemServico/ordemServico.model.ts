import { Entity } from "app/shared/models/entity.model";
import { StatusOrdemServicoEnum } from "./statusOrdemServico.enum";

export interface OrdemServico extends Entity {
    numeroOrdem: string;
    tipo: string;
    ttsn: string;
    tcsnPousos: string;
    dataAbertura: Date;
    ttsnMotor: string;
    tcsnCiclos: string;
    dataFechamento?: Date;
    requisicaoMateriais: string;
    realizadoPor: string;
    realizadoPorAnac: string;
    dataRealizacao?: Date;
    inspecionadoPor: string;
    inspecionadoPorAnac: string;
    dataInspecao?: Date;

    itens: Servico[];
}

export interface Servico extends Entity {
    servicoId: string;
    custo?: number;
    status: StatusOrdemServicoEnum;
}