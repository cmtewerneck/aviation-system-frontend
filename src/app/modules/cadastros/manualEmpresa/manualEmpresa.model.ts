import { Entity } from "app/shared/models/entity.model";

export interface ManualEmpresa extends Entity {
    descricao: string;
    sigla: string;
    revisaoAtual: number;
    dataRevisao: Date;
    revisaoAnalise?: number;
    arquivo: string;
    arquivoUpload: string;
}