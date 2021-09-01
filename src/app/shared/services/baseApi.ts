import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BaseApi {

  private readonly apiUrl: string;

  constructor(
    private readonly http: HttpClient,
    // private readonly loaderHandler: LoaderEventHandler
    ) {
    this.apiUrl = environment.apiUrl;
  }

  get<T>(url: string, params?: object, showLoader: boolean = true): Observable<T> {
    return this.applyLoader<T>(this.http.get<T>(this.resolveUrl(url), params), showLoader);
  }

  patch<T>(url: string, body: any, params?: object, showLoader: boolean = true): Observable<T> {
    return this.applyLoader<T>(this.http.patch<T>(this.resolveUrl(url), body, params), showLoader);
  }

  post<T>(url: string, body: any, params?: object, showLoader: boolean = true): Observable<T> {
    return this.applyLoader<T>(this.http.post<T>(this.resolveUrl(url), body, params), showLoader);
  }

  put<T>(url: string, body: any, params?: object, showLoader: boolean = true): Observable<T> {
    return this.applyLoader<T>(this.http.put<T>(this.resolveUrl(url), body, params), showLoader);
  }

  delete<T>(url: string, params?: object, showLoader: boolean = true): Observable<T> {
    return this.applyLoader<T>(this.http.delete<T>(this.resolveUrl(url), params), showLoader);
  }

  resolveUrl(path: string): string {
    return `${this.apiUrl}/api/${path}`;
  }

  private applyLoader<T>(observable: Observable<T>, showLoader: boolean): Observable<T> {
    // if (showLoader) {
    //     this.loaderHandler.showLoader(showLoader);
    // }
    return observable
      .pipe(tap(() => {
        // if (showLoader) {
        //     this.loaderHandler.showLoader(!showLoader);
        // }
      }, () => {
        // if (showLoader) {
        //     this.loaderHandler.showLoader(!showLoader);
        // }
      }));
  }

}
