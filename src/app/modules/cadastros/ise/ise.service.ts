import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { Ise } from "./ise.model";

@Injectable({
    providedIn: 'root'
})
export class IseService extends BaseApiService<Ise>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'ises');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }
}