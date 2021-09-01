import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { Tripulante } from "../tripulante/tripulante.model";
import { ListaPassageiro } from "./listaPassageiro.model";

@Injectable({
    providedIn: 'root'
})
export class ListaPassageiroService extends BaseApiService<ListaPassageiro>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'listas-passageiro');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    obterTripulantes(): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>('https://localhost:44335/api/pessoas');
    }
}