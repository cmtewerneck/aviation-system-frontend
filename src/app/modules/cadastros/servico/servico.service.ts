import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Servico } from "./servico.model";

@Injectable({
    providedIn: 'root'
})
export class ServicoService extends BaseApiService<Servico>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'servicos');
    }

    exportToExcel() {
        return this.http
            .get('https://localhost:44335/api/servicos/export-to-excel/');
    }

    exportToPdf() {
        return this.http
            .get('https://localhost:44335/api/servicos/export-to-pdf/');
    }
}