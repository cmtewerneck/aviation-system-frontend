import { Entity } from "app/shared/models/entity.model";
import { TipoOrgaoEmissorEnum } from "./tipoOrgaoEmissor.enum";

export interface AeronaveTarifa extends Entity {
    data: Date;
    vencimento: Date;
    valor: number;
    situacao: boolean;
    numeracao: string;
    orgaoEmissor: TipoOrgaoEmissorEnum;
    aeronaveId: string;
}