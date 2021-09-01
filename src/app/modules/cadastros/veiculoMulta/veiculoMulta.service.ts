import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Veiculo } from "../veiculo/veiculo.model";
import { VeiculoMulta } from "./veiculoMulta.model";

@Injectable({
    providedIn: 'root'
})
export class VeiculoMultaService extends BaseApiService<VeiculoMulta>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'veiculos/multas');
    }

    obterVeiculos(): Observable<Veiculo[]> {
        return this.http
            .get<Veiculo[]>('https://localhost:44335/api/veiculos');
    }

    exportToExcel(placa: string) {
        return this.http
            .get('https://localhost:44335/api/veiculos/multas/export-to-excel/' + placa);
    }

    exportToPdf(placa: string) {
        return this.http
            .get('https://localhost:44335/api/veiculos/multas/export-to-pdf/' + placa);
    }
}