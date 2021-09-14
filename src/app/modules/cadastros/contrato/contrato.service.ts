import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { Tripulante } from "../tripulante/tripulante.model";
import { Contrato } from "./contrato.model";

@Injectable({
    providedIn: 'root'
})
export class ContratoService extends BaseApiService<Contrato>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'contratos');
    }

    obterTripulantes(): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>('https://localhost:44335/api/pessoas');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    exportToExcel(contratante: string) {
        return this.http
            .get('https://localhost:44335/api/contratos/export-to-excel/' + contratante);
    }

    exportToPdf(contratante: string) {
        return this.http
            .get('https://localhost:44335/api/contratos/export-to-pdf/' + contratante);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/contratos/export-item-to-pdf/' + id);
    }
}