import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Curso } from "./curso.model";

@Injectable({
    providedIn: 'root'
})
export class CursoService extends BaseApiService<Curso>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'cursos');
    }

    exportToExcel() {
        return this.http
            .get('https://localhost:44335/api/cursos/export-to-excel/');
    }

    exportToPdf() {
        return this.http
            .get('https://localhost:44335/api/cursos/export-to-pdf/');
    } 
    
    exportItemToPdf(id: string) {
        return this.http
            .get('https://localhost:44335/api/cursos/export-item-to-pdf/' + id);
    }
}