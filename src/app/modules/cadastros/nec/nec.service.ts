import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Sae } from "../sae/sae.model";
import { Tripulante } from "../tripulante/tripulante.model";
import { Nec } from "./nec.model";

@Injectable({
    providedIn: 'root'
})
export class NecService extends BaseApiService<Nec>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'necs');
    }

    obterTripulantes(): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>('https://localhost:44335/api/pessoas');
    }

    obterSaes(): Observable<Sae[]> {
        return this.http
            .get<Sae[]>('https://localhost:44335/api/saes');
    }

    exportToExcel(tipoTreinamento: string) {
        return this.http
            .get('https://localhost:44335/api/necs/export-to-excel/' + tipoTreinamento);
    }

    exportToPdf(tipoTreinamento: string) {
        return this.http
            .get('https://localhost:44335/api/necs/export-to-pdf/' + tipoTreinamento);
    }
}