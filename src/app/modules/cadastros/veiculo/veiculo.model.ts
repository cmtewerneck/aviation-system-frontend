import { Entity } from "app/shared/models/entity.model";
import { TipoCombustivelEnum } from "./tipoCombustivel.enum";

export interface Veiculo extends Entity {
    placa: string;
    ufPlaca: string;
    ano?: number;
    proprio: boolean;
    kmAtual?: number;
    modelo: string;
    renavam: string;
    tipoCombustivel: TipoCombustivelEnum;
    imagem: string;
}