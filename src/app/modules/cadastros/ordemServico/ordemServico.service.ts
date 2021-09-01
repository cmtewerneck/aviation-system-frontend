import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { Servico } from "../servico/servico.model";
import { OrdemServico } from "./ordemServico.model";

@Injectable({
    providedIn: 'root'
})
export class OrdemServicoService extends BaseApiService<OrdemServico>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'ordens-servico');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    obterServicos(): Observable<Servico[]> {
        return this.http
            .get<Servico[]>('https://localhost:44335/api/servicos');
    }
}