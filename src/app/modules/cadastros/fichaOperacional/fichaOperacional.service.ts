import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { FichaOperacional } from "./fichaOperacional.model";

@Injectable({
    providedIn: 'root'
})
export class FichaOperacionalService extends BaseApiService<FichaOperacional>
{
    constructor(api: BaseApi) {
        super(api, 'fichas-operacionais');
    }
}