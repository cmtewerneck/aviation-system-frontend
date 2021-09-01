import { Entity } from "app/shared/models/entity.model";
import { TipoOficioEnum } from "./tipoOficio.enum";

export interface OficioEmitido extends Entity {
    data: Date;
    numeracao: string;
    mensagem: string;
    destinatario: string;
    assunto: string;
    tipoOficio: TipoOficioEnum;
}