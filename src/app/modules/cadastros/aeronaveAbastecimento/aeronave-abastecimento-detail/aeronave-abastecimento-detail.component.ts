import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AeronaveAbastecimento } from '../aeronaveAbastecimento.model';
import { AeronaveAbastecimentoService } from '../aeronaveAbastecimento.service';

@Component({
    selector: 'app-aeronave-abastecimento-detail',
    templateUrl: './aeronave-abastecimento-detail.component.html',
    styleUrls: ['./aeronave-abastecimento-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AeronaveAbastecimentoDetailComponent implements OnInit {

    abastecimentoId: string = "";
    
    isLoading: boolean = false;

    constructor(private aeronaveAbastecimentoService: AeronaveAbastecimentoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.abastecimentoId = params['id']);
                }

    abastecimento: AeronaveAbastecimento;
    abastecimentos: AeronaveAbastecimento[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.aeronaveAbastecimentoService.getById(this.abastecimentoId).subscribe(result => {
            this.abastecimento = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.aeronaveAbastecimentoService.exportItemToPdf(this.abastecimentoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}