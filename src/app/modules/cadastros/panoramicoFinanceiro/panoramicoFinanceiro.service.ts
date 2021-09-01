import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { PanoramicoServico } from "../panoramicoServico/panoramicoServico.model";
import { Revendedor } from "../revendedor/revendedor.model";
import { PanoramicoFinanceiro } from "./panoramicoFinanceiro.model";

@Injectable({
    providedIn: 'root'
})
export class PanoramicoFinanceiroService extends BaseApiService<PanoramicoFinanceiro>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'panoramicos/financeiros');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    obterRevendedores(): Observable<Revendedor[]> {
        return this.http
            .get<Revendedor[]>('https://localhost:44335/api/revendedores');
    }

    obterServicosDaAeronave(aeronaveId: any): Observable<PanoramicoServico[]> {
        return this.http
        .get<PanoramicoServico[]>('https://localhost:44335/api/panoramicos/servicos/por-aeronave/' + aeronaveId);
    }

    obterServicosPorId(id: any): Observable<PanoramicoServico> {
        return this.http
        .get<PanoramicoServico>('https://localhost:44335/api/panoramicos/servicos/' + id);
    }

    exportToExcel(revendedor: string) {
        return this.http
            .get('https://localhost:44335/api/panoramicos/financeiros/export-to-excel/' + revendedor);
    }

    exportToPdf(revendedor: string) {
        return this.http
            .get('https://localhost:44335/api/panoramicos/financeiros/export-to-pdf/' + revendedor);
    }
}