import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { MaterialOperacional } from "./materialOperacional.model";

@Injectable({
    providedIn: 'root'
})
export class MaterialOperacionalService extends BaseApiService<MaterialOperacional>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'materiais-operacionais');
    }

    exportToExcel(localizacao: string) {
        return this.http
            .get('https://localhost:44335/api/materiais-operacionais/export-to-excel/' + localizacao);
    }

    exportToPdf(localizacao: string) {
        return this.http
            .get('https://localhost:44335/api/materiais-operacionais/export-to-pdf/' + localizacao);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/materiais-operacionais/export-item-to-pdf/' + id);
    }
}