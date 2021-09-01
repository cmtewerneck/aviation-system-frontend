import { Entity } from "app/shared/models/entity.model";
import { TipoOficioEnum } from "./tipoOficio.enum";

export interface OficioRecebido extends Entity {
    data: Date;
    numeracao: string;
    remetente: string;
    assunto: string;
    arquivo: string;
    tipoOficio: TipoOficioEnum;
}