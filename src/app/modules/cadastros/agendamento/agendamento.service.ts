import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Aeronave } from "../aeronave/aeronave.model";
import { CategoriaVoo } from "../categoriaVoo/categoriaVoo.model";
import { Agendamento } from "./agendamento.model";

type NewType = Observable<CategoriaVoo[]>;

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService extends BaseApiService<Agendamento>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'agendamentos');
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>('https://localhost:44335/api/aeronaves');
    }

    obterCategorias(): Observable<CategoriaVoo[]> {
        return this.http
            .get<CategoriaVoo[]>('https://localhost:44335/api/categorias-voo');
    }
}