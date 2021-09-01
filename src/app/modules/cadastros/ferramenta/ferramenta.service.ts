import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Ferramenta } from "./ferramenta.model";

@Injectable({
    providedIn: 'root'
})
export class FerramentaService extends BaseApiService<Ferramenta>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'ferramentas');
    }

    exportToExcel(localizacao: string) {
        return this.http
            .get('https://localhost:44335/api/ferramentas/export-to-excel/' + localizacao);
    }

    exportToPdf(localizacao: string) {
        return this.http
            .get('https://localhost:44335/api/ferramentas/export-to-pdf/' + localizacao);
    }
}