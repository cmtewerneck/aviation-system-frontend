import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaPagar } from '../contaPagar.model';
import { ContaPagarService } from '../contaPagar.service';

@Component({
    selector: 'app-conta-pagar-detail',
    templateUrl: './conta-pagar-detail.component.html',
    styleUrls: ['./conta-pagar-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContaPagarDetailComponent implements OnInit {

    contaId: string = "";
    isLoading: boolean = false;

    constructor(private contaPagarService: ContaPagarService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.contaId = params['id']);
                }

    conta: ContaPagar;
    contas: ContaPagar[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.contaPagarService.getById(this.contaId).subscribe(result => {
            this.conta = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.contaPagarService.exportItemToPdf(this.contaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}