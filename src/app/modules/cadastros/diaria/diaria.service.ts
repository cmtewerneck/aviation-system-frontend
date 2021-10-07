import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Contrato } from "../contrato/contrato.model";
import { Diaria } from "./diaria.model";
import { Pessoa } from "./pessoa.model";

@Injectable({
    providedIn: 'root'
})
export class DiariaService extends BaseApiService<Diaria>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'diarias');
    }

    obterPessoas(): Observable<Pessoa[]> {
        return this.http
            .get<Pessoa[]>('https://localhost:44335/api/pessoas');
    }

    obterContratos(): Observable<Contrato[]> {
        return this.http
            .get<Contrato[]>('https://localhost:44335/api/contratos');
    }

    exportToExcel(nome: string) {
        return this.http
            .get('https://localhost:44335/api/diarias/export-to-excel/' + nome);
    }

    exportToPdf(nome: string) {
        return this.http
            .get('https://localhost:44335/api/diarias/export-to-pdf/' + nome);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/diarias/export-item-to-pdf/' + id);
    }
}