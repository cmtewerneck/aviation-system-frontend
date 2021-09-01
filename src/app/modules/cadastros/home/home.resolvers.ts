import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from 'app/modules/cadastros/home/home.service';

@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _homeService: HomeService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._homeService.getData();
    }
}
