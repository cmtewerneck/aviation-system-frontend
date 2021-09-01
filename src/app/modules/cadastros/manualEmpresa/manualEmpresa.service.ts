import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { ManualEmpresa } from "./manualEmpresa.model";

@Injectable({
    providedIn: 'root'
})
export class ManualEmpresaService extends BaseApiService<ManualEmpresa>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'manuais-empresa');
    }

    exportToExcel() {
        return this.http
            .get('https://localhost:44335/api/manuais-empresa/export-to-excel');
    }

    exportToPdf() {
        return this.http
            .get('https://localhost:44335/api/manuais-empresa/export-to-pdf');
    }
}