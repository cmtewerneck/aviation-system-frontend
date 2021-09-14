import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Suprimento } from "./suprimento.model";

@Injectable({
    providedIn: 'root'
})
export class SuprimentoService extends BaseApiService<Suprimento>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'suprimentos');
    }

    exportToExcel(localizacao: string) {
        return this.http
            .get('https://localhost:44335/api/suprimentos/export-to-excel/' + localizacao);
    }

    exportToPdf(localizacao: string) {
        return this.http
            .get('https://localhost:44335/api/suprimentos/export-to-pdf/' + localizacao);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/suprimentos/export-item-to-pdf/' + id);
    }
}