import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Aluno } from "./aluno.model";

@Injectable({
    providedIn: 'root'
})
export class AlunoService extends BaseApiService<Aluno>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'pessoas');
    }

    exportToExcel(tipoColaborador: number) {
        return this.http
            .get('https://localhost:44335/api/pessoas/export-to-excel/' + tipoColaborador);
    }

    exportToPdf(tipoColaborador: number) {
        return this.http
            .get('https://localhost:44335/api/pessoas/export-to-pdf/' + tipoColaborador);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/pessoas/export-item-to-pdf/' + id);
    }
}