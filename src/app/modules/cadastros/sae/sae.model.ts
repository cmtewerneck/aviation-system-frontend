import { Entity } from "app/shared/models/entity.model";
import { LocalizacaoEnum } from "./localizacao.enum";
import { SituacaoTreinamentoEnum } from "./situacaoTreinamento.enum";

export interface Sae extends Entity {
    numero: string; 
    piloto: string; 
    funcao: string; 
    examinador: boolean; 
    examinadorCanac: string; 
    examinadorNome: string; 
    localizacao: LocalizacaoEnum; 
    equipamento: string; 
    dataExame: Date; 
    pais: string; 
    cidade: string; 
    situacaoTreinamento: SituacaoTreinamentoEnum; 
    gruDigitos: string; 
    valor?: number; 
    pagamentoGru?: Date; 
    nrtId: string;
}

 