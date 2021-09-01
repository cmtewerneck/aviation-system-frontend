import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { PanoramicoServico } from "./panoramicoServico.model";

@Injectable({
    providedIn: 'root'
})
export class PanoramicoServicoService extends BaseApiService<PanoramicoServico>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'panoramicos/servicos');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    exportToExcel(matricula: string) {
        return this.http
            .get('https://localhost:44335/api/panoramicos/servicos/export-to-excel/' + matricula);
    }

    exportToPdf(matricula: string) {
        return this.http
            .get('https://localhost:44335/api/panoramicos/servicos/export-to-pdf/' + matricula);
    }
}