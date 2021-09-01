import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { CategoriaTreinamento } from "../categoriaTreinamento/categoriaTreinamento.model";
import { Tripulante } from "../tripulante/tripulante.model";
import { Nrt } from "./nrt.model";

@Injectable({
    providedIn: 'root'
})
export class NrtService extends BaseApiService<Nrt>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'nrts');
    }

    obterTripulantes(): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>('https://localhost:44335/api/pessoas');
    }

    obterCategorias(): Observable<CategoriaTreinamento[]> {
        return this.http
            .get<CategoriaTreinamento[]>('https://localhost:44335/api/categorias-treinamento');
    }

    exportToExcel(tipoTreinamento: string) {
        return this.http
            .get('https://localhost:44335/api/nrts/export-to-excel/' + tipoTreinamento);
    }

    exportToPdf(tipoTreinamento: string) {
        return this.http
            .get('https://localhost:44335/api/nrts/export-to-pdf/' + tipoTreinamento);
    }
}