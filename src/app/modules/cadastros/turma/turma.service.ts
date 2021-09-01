import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Curso } from "../curso/curso.model";
import { Aluno } from "../aluno/aluno.model";
import { Turma } from "./turma.model";

@Injectable({
    providedIn: 'root'
})
export class TurmaService extends BaseApiService<Turma>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'turmas');
    }

    obterPessoas(): Observable<Aluno[]> {
        return this.http
            .get<Aluno[]>('https://localhost:44335/api/pessoas');
    }

    obterCursos(): Observable<Curso[]> {
        return this.http
            .get<Curso[]>('https://localhost:44335/api/cursos');
    }

    exportToExcel(curso: string) {
        return this.http
            .get('https://localhost:44335/api/turmas/export-to-excel/' + curso);
    }

    exportToPdf(curso: string) {
        return this.http
            .get('https://localhost:44335/api/turmas/export-to-pdf/' + curso);
    }
}