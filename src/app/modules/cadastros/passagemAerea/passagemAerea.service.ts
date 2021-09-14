import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Pessoa } from "../diaria/pessoa.model";
import { PassagemAerea } from "./passagemAerea.model";

@Injectable({
    providedIn: 'root'
})
export class PassagemAereaService extends BaseApiService<PassagemAerea>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'passagens-aereas');
    }

    obterPessoas(): Observable<Pessoa[]> {
        return this.http
            .get<Pessoa[]>('https://localhost:44335/api/pessoas');
    }

    exportToExcel(tripulante: string) {
        return this.http
            .get('https://localhost:44335/api/passagens-aereas/export-to-excel/' + tripulante);
    }

    exportToPdf(tripulante: string) {
        return this.http
            .get('https://localhost:44335/api/passagens-aereas/export-to-pdf/' + tripulante);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/passagens-aereas/export-item-to-pdf/' + id);
    }
}