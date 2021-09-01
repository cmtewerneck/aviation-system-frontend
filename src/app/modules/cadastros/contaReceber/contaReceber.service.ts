import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { ContaReceber } from "./contaReceber.model";

@Injectable({
    providedIn: 'root'
})
export class ContaReceberService extends BaseApiService<ContaReceber>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'financeiros');
    }

    exportToExcel(tipoFinanceiro: number) {
        return this.http
            .get('https://localhost:44335/api/financeiros/export-to-excel/' + tipoFinanceiro);
    }

    exportToPdf(tipoFinanceiro: number) {
        return this.http
            .get('https://localhost:44335/api/financeiros/export-to-pdf/' + tipoFinanceiro);
    }
}