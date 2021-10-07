import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoGasto } from '../veiculoGasto.model';
import { VeiculoGastoService } from '../veiculoGasto.service';

@Component({
    selector: 'app-veiculo-gasto-detail',
    templateUrl: './veiculo-gasto-detail.component.html',
    styleUrls: ['./veiculo-gasto-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class VeiculoGastoDetailComponent implements OnInit {

    veiculoGastoId: string = "";
    isLoading: boolean = false;

    constructor(private veiculoGastoService: VeiculoGastoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.veiculoGastoId = params['id']);
                }

    veiculoGasto: VeiculoGasto;
    veiculoGastos: VeiculoGasto[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.veiculoGastoService.getById(this.veiculoGastoId).subscribe(result => {
            this.veiculoGasto = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.veiculoGastoService.exportItemToPdf(this.veiculoGastoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}