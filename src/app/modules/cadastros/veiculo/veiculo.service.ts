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

    exportToExcel(tipoCombustivel?: TipoCombustivelEnum) {
        return this.http
            .get(`https://localhost:44335/api/veiculos/export-to-excel?tipoCombustivel=${tipoCombustivel}`);
    }

    exportToPdf(tipoCombustivel?: TipoCombustivelEnum) {
        return this.http
            .get('https://localhost:44335/api/veiculos/export-to-pdf/' + tipoCombustivel);
    }
}