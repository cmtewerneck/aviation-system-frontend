import { Entity } from "app/shared/models/entity.model";
import { SituacaoAlunoEnum } from "./situacaoAluno.enum";

export interface Turma extends Entity {
    codigo: string;
    dataInicio: Date;
    dataTermino?: Date;
    inscricao?: number;
    mensalidade?: number;
    
    cursoId: string;
    alunosTurmas: Aluno[];
}

export interface Aluno extends Entity {
    alunoId: string;
    //dataInscricao: Date;
    situacaoAluno: SituacaoAlunoEnum;
}