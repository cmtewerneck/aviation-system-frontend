import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Contrato } from "../contrato/contrato.model";
import { ContaPagar } from "./contaPagar.model";

@Injectable({
    providedIn: 'root'
})
export class ContaPagarService extends BaseApiService<ContaPagar>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'financeiros');
    }

    obterContratos(): Observable<Contrato[]> {
        return this.http
            .get<Contrato[]>('https://localhost:44335/api/contratos');
    }

    exportToExcel(tipoFinanceiro: number) {
        return this.http
            .get('https://localhost:44335/api/financeiros/export-to-excel/' + tipoFinanceiro);
    }

    exportToPdf(tipoFinanceiro: number) {
        return this.http
            .get('https://localhost:44335/api/financeiros/export-to-pdf/' + tipoFinanceiro);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/financeiros/export-item-to-pdf/' + id);
    }
}