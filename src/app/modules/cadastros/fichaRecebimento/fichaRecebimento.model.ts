import { Entity } from "app/shared/models/entity.model";
import { SituacaoRecebimentoEnum } from "./situacaoRecebimento.enum";

export interface FichaRecebimento extends Entity {
    dataEntrada: Date;                                     
    local: string;                                             
    responsavel: string;                                        
    dataSaida?: Date;                                       
    drenos?: SituacaoRecebimentoEnum;                        
    comandos?: SituacaoRecebimentoEnum;                        
    esquisFlutuadores?: SituacaoRecebimentoEnum;               
    janelaParaBrisa?: SituacaoRecebimentoEnum;                 
    capotasMotor?: SituacaoRecebimentoEnum;                    
    estofamentoCintosSeguranca?: SituacaoRecebimentoEnum;      
    pintura?: SituacaoRecebimentoEnum;                         
    fiacao?: SituacaoRecebimentoEnum;                          
    mangueiraTubulacao?: SituacaoRecebimentoEnum;              
    luzesFarois?: SituacaoRecebimentoEnum;                     
    radiosInstrumentos?: SituacaoRecebimentoEnum;              
    elt?: SituacaoRecebimentoEnum;                             
    bateria?: SituacaoRecebimentoEnum;                         
    extintores?: SituacaoRecebimentoEnum;                      
    kitPrimeirosSocorros?: SituacaoRecebimentoEnum;            
    aeronaveId: string;  
}                                      