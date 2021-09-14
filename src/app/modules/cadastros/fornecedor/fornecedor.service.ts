import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Fornecedor } from "./fornecedor.model";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService extends BaseApiService<Fornecedor>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'fornecedores');
    }

    exportToExcel() {
        return this.http
            .get('https://localhost:44335/api/fornecedores/export-to-excel');
    }

    exportToPdf() {
        return this.http
            .get('https://localhost:44335/api/fornecedores/export-to-pdf');
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/fornecedores/export-item-to-pdf/' + id);
    }
}