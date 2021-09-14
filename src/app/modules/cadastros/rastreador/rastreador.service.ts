import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { Rastreador } from "./rastreador.model";

@Injectable({
    providedIn: 'root'
})
export class RastreadorService extends BaseApiService<Rastreador>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves/rastreadores');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    exportToExcel(modelo: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/rastreadores/export-to-excel/' + modelo);
    }

    exportToPdf(modelo: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/rastreadores/export-to-pdf/' + modelo);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/rastreadores/export-item-to-pdf/' + id);
    }
}