import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Nrt } from "../nrt/nrt.model";
import { Sae } from "./sae.model";

@Injectable({
    providedIn: 'root'
})
export class SaeService extends BaseApiService<Sae>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'saes');
    }

    obterNrts(): Observable<Nrt[]> {
        return this.http
            .get<Nrt[]>('https://localhost:44335/api/nrts');
    }

    exportToExcel(piloto: string) {
        return this.http
            .get('https://localhost:44335/api/saes/export-to-excel/' + piloto);
    }

    exportToPdf(piloto: string) {
        return this.http
            .get('https://localhost:44335/api/saes/export-to-pdf/' + piloto);
    }
}