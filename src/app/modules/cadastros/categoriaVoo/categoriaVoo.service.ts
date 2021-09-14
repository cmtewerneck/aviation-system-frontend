import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { CategoriaVoo } from "./categoriaVoo.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaVooService extends BaseApiService<CategoriaVoo>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'categorias-voo');
    }

    exportToExcel() {
        return this.http
            .get('https://localhost:44335/api/categorias-voo/export-to-excel/');
    }

    exportToPdf() {
        return this.http
            .get('https://localhost:44335/api/categorias-voo/export-to-pdf/');
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/categorias-voo/export-item-to-pdf/' + id);
    }
}