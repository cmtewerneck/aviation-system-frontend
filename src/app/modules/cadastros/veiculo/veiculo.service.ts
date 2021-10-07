import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { TipoCombustivelEnum } from "./tipoCombustivel.enum";
import { Veiculo } from "./veiculo.model";

@Injectable({
    providedIn: 'root'
})
export class VeiculoService extends BaseApiService<Veiculo>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'veiculos');
    }

    exportToExcel(modelo: string) {
        return this.http
        .get('https://localhost:44335/api/veiculos/export-to-excel/' + modelo);
    }

    exportToPdf(modelo: string) {
        return this.http
            .get('https://localhost:44335/api/veiculos/export-to-pdf/' + modelo);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/veiculos/export-item-to-pdf/' + id);
    }
}