import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { AeronaveTarifa } from "./aeronaveTarifa.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveTarifaService extends BaseApiService<AeronaveTarifa>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves/tarifas');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    exportToExcel(matricula: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/tarifas/export-to-excel/' + matricula);
    }

    exportToPdf(matricula: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/tarifas/export-to-pdf/' + matricula);
    }
}