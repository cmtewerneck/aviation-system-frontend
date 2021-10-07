import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanoramicoFinanceiro } from '../panoramicoFinanceiro.model';
import { PanoramicoFinanceiroService } from '../panoramicoFinanceiro.service';

@Component({
    selector: 'app-panoramico-financeiro-detail',
    templateUrl: './panoramico-financeiro-detail.component.html',
    styleUrls: ['./panoramico-financeiro-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PanoramicoFinanceiroDetailComponent implements OnInit {

    financeiroId: string = "";
    isLoading: boolean = false;

    constructor(private panoramicoFinanceiroService: PanoramicoFinanceiroService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.financeiroId = params['id']);
                }

    financeiro: PanoramicoFinanceiro;
    financeiros: PanoramicoFinanceiro[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.panoramicoFinanceiroService.getById(this.financeiroId).subscribe(result => {
            this.financeiro = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.panoramicoFinanceiroService.exportItemToPdf(this.financeiroId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}