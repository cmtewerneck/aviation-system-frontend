import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { CategoriaTreinamento } from "./categoriaTreinamento.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaTreinamentoService extends BaseApiService<CategoriaTreinamento>
{
    constructor(api: BaseApi,  private http: HttpClient) {
        super(api, 'categorias-treinamento');
    }

    exportToExcel(tipoTreinamento: string) {
        return this.http
            .get('https://localhost:44335/api/categorias-treinamento/export-to-excel/' + tipoTreinamento);
    }

    exportToPdf(tipoTreinamento: string) {
        return this.http
            .get('https://localhost:44335/api/categorias-treinamento/export-to-pdf/' + tipoTreinamento);
    }
}