import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Revendedor } from "./revendedor.model";

@Injectable({
    providedIn: 'root'
})
export class RevendedorService extends BaseApiService<Revendedor>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'revendedores');
    }

    exportToExcel() {
        return this.http
            .get('https://localhost:44335/api/revendedores/export-to-excel/');
    }

    exportToPdf() {
        return this.http
            .get('https://localhost:44335/api/revendedores/export-to-pdf/');
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/revendedores/export-item-to-pdf/' + id);
    }
}