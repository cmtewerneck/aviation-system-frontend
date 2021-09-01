import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { OficioRecebido } from "./oficioRecebido.model";

@Injectable({
    providedIn: 'root'
})
export class OficioRecebidoService extends BaseApiService<OficioRecebido>
{
    constructor(api: BaseApi) {
        super(api, 'oficios');
    }
}