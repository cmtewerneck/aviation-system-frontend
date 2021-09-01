import { Entity } from "app/shared/models/entity.model";
import { TipoTreinamentoEnum } from "./tipoTreinamento.enum";
import { SituacaoTreinamentoEnum } from "./situacaoTreinamento.enum";

export interface Nec extends Entity {
    numero: string; 
    funcao: string; 
    equipamento: string; 
    dataExame: Date; 
    tipoTreinamento: TipoTreinamentoEnum; 
    situacaoTreinamento: SituacaoTreinamentoEnum; 
    gruDigitos: string; 
    valor?: number; 
    pagamentoGru?: Date; 
    saeId: string;
} 