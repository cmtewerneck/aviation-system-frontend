import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Tripulante } from "../tripulante/tripulante.model";
import { Papeleta } from "./papeleta.model";

@Injectable({
    providedIn: 'root'
})
export class PapeletaService extends BaseApiService<Papeleta>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'papeletas');
    }

    obterTripulantes(): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>('https://localhost:44335/api/pessoas');
    }
}