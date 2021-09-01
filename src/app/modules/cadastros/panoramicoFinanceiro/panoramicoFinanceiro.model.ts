import { Entity } from "app/shared/models/entity.model";

export interface PanoramicoFinanceiro extends Entity {
    data: Date;
    preco: number;
    situacao: boolean;
    
    aeronaveId: string;
    revendedorId: string;
    PanoramicoServicoId: string;
}