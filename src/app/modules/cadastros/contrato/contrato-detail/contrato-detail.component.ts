import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from '../contrato.model';
import { ContratoService } from '../contrato.service';

@Component({
    selector: 'app-contrato-detail',
    templateUrl: './contrato-detail.component.html',
    styleUrls: ['./contrato-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContratoDetailComponent implements OnInit {

    contratoId: string = "";
    
    isLoading: boolean = false;

    constructor(private contratoService: ContratoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.contratoId = params['id']);
                }

    contrato: Contrato;
    contratos: Contrato[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.contratoService.getById(this.contratoId).subscribe(result => {
            this.contrato = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.contratoService.exportItemToPdf(this.contratoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}