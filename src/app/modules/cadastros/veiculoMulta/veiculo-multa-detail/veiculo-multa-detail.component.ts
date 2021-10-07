import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoMulta } from '../veiculoMulta.model';
import { VeiculoMultaService } from '../veiculoMulta.service';

@Component({
    selector: 'app-veiculo-multa-detail',
    templateUrl: './veiculo-multa-detail.component.html',
    styleUrls: ['./veiculo-multa-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class VeiculoMultaDetailComponent implements OnInit {

    veiculoMultaId: string = "";
    isLoading: boolean = false;

    constructor(private veiculoMultaService: VeiculoMultaService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.veiculoMultaId = params['id']);
                }

    veiculoMulta: VeiculoMulta;
    veiculoMultas: VeiculoMulta[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.veiculoMultaService.getById(this.veiculoMultaId).subscribe(result => {
            this.veiculoMulta = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.veiculoMultaService.exportItemToPdf(this.veiculoMultaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}