import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaReceber } from '../contaReceber.model';
import { ContaReceberService } from '../contaReceber.service';

@Component({
    selector: 'app-conta-receber-detail',
    templateUrl: './conta-receber-detail.component.html',
    styleUrls: ['./conta-receber-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContaReceberDetailComponent implements OnInit {

    contaId: string = "";
    isLoading: boolean = false;

    constructor(private contaReceberService: ContaReceberService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.contaId = params['id']);
                }

    conta: ContaReceber;
    contas: ContaReceber[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.contaReceberService.getById(this.contaId).subscribe(result => {
            this.conta = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.contaReceberService.exportItemToPdf(this.contaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}