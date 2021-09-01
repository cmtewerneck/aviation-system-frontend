import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { ManualVoo } from "./manualVoo.model";

@Injectable({
    providedIn: 'root'
})
export class ManualVooService extends BaseApiService<ManualVoo>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'manuais-voo');
    }

    exportToExcel() {
        return this.http
            .get('https://localhost:44335/api/manuais-voo/export-to-excel/');
    }

    exportToPdf() {
        return this.http
            .get('https://localhost:44335/api/manuais-voo/export-to-pdf/');
    }
}