import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { CategoriaVoo } from "./categoriaVoo.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaVooService extends BaseApiService<CategoriaVoo>
{
    constructor(api: BaseApi) {
        super(api, 'categorias-voo');
    }
}