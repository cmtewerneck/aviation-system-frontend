import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { AeronaveAbastecimento } from "./aeronaveAbastecimento.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveAbastecimentoService extends BaseApiService<AeronaveAbastecimento>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves/abastecimentos');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    exportToExcel(matricula: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/abastecimentos/export-to-excel/' + matricula);
    }

    exportToPdf(matricula: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/abastecimentos/export-to-pdf/' + matricula);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/aeronaves/abastecimentos/export-item-to-pdf/' + id);
    }
}