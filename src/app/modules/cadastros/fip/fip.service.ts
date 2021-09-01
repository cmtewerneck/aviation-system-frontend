import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Curso } from "../curso/curso.model";
import { Fip } from "./fip.model";

@Injectable({
    providedIn: 'root'
})
export class FipService extends BaseApiService<Fip>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'fips');
    }

    obterCursos(): Observable<Curso[]> {
        return this.http
            .get<Curso[]>('https://localhost:44335/api/cursos');
    }
}