import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Ferramenta } from "../ferramenta/ferramenta.model";
import { Cautela } from "./cautela.model";

@Injectable({
    providedIn: 'root'
})
export class CautelaService extends BaseApiService<Cautela>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'cautelas');
    }

    obterFerramentas(): Observable<Ferramenta[]> {
        return this.http
            .get<Ferramenta[]>('https://localhost:44335/api/ferramentas');
    }
}