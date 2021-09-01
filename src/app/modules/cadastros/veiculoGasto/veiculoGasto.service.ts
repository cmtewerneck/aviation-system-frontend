import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Veiculo } from "../veiculo/veiculo.model";
import { VeiculoGasto } from "./veiculoGasto.model";

@Injectable({
    providedIn: 'root'
})
export class VeiculoGastoService extends BaseApiService<VeiculoGasto>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'veiculos/gastos');
    }

    obterVeiculos(): Observable<Veiculo[]> {
        return this.http
            .get<Veiculo[]>('https://localhost:44335/api/veiculos');
    }

    exportToExcel(placa: string) {
        return this.http
            .get('https://localhost:44335/api/veiculos/gastos/export-to-excel/' + placa);
    }

    exportToPdf(placa: string) {
        return this.http
            .get('https://localhost:44335/api/veiculos/gastos/export-to-pdf/' + placa);
    }
}