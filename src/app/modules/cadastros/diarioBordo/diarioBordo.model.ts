import { Entity } from "app/shared/models/entity.model";
import { NaturezaVooEnum } from "./naturezaVoo.enum";

export interface DiarioBordo extends Entity {
    data: Date;
    baseContratual: string;
    numero: number;
    pagina: number;
    observacoes: string;
    discrepancias: string;
    acoesCorretivas: string;
    aeronaveId: string;

    linhasDiariosBordo: LinhaDiarioBordo[];
}

export interface LinhaDiarioBordo extends Entity {
    de: string;                           
    para: string;                         
    horaAcionamento: Date;           
    horaDecolagem?: Date;            
    horaPouso?: Date;                
    horaCorte: Date;                 
    totalDiurno?: Date;              
    totalNoturno?: Date;              
    totalIfr?: Date;             
    totalNavegacao?: Date;           
    totalDecimal: number;                
    totalDecPouso?: number;              
    totalAcionamentoCorte: number;       
    pousos: number;                          
    pob: number;                             
    combustivelDecolagem: number;            
    naturezaVoo: NaturezaVooEnum;        
    preVooResponsavel: string;            
    posVooResponsavel: string;            

    diarioBordoId: string;                 
    comandanteId: string;                  
    copilotoId?: string;                   
    mecanicoResponsavelId?: string;
}       