import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Relprev } from "./relprev.model";

@Injectable({
    providedIn: 'root'
})
export class RelprevService extends BaseApiService<Relprev>
{
    constructor(api: BaseApi) {
        super(api, 'relprevs');
    }
}