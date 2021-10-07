import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Observable } from "rxjs";
import { Suprimento } from "../suprimento/suprimento.model";
import { SuprimentoMovimentacao } from "./suprimentoMovimentacao.model";

@Injectable({
    providedIn: 'root'
})
export class SuprimentoMovimentacaoService extends BaseApiService<SuprimentoMovimentacao>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'suprimentos/movimentacoes');
    }

    obterItens(): Observable<Suprimento[]> {
        return this.http
            .get<Suprimento[]>('https://localhost:44335/api/suprimentos');
    }

    exportToExcel(itemNomenclatura: string) {
        return this.http
            .get('https://localhost:44335/api/suprimentos/movimentacoes/export-to-excel/' + itemNomenclatura);
    }

    exportToPdf(itemNomenclatura: string) {
        return this.http
            .get('https://localhost:44335/api/suprimentos/movimentacoes/export-to-pdf/' + itemNomenclatura);
    }

    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/suprimentos/movimentacoes/export-item-to-pdf/' + id);
    }
}