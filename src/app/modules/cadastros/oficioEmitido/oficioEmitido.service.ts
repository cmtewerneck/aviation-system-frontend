import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { OficioEmitido } from "./oficioEmitido.model";

@Injectable({
    providedIn: 'root'
})
export class OficioEmitidoService extends BaseApiService<OficioEmitido>
{
    constructor(api: BaseApi) {
        super(api, 'oficios');
    }
}