import { Entity } from "app/shared/models/entity.model";

export interface Relprev extends Entity {
    dataHora: Date;  
    aeroporto: string;  
    assunto: string;  
    local: string;  
    pessoalEnvolvido: string;  
    organizacao: string;  
    mensagem: string;  
    nome: string;  
    email: string;  
    telefone: string; 
} 