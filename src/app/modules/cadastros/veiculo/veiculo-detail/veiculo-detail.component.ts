import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Veiculo } from '../veiculo.model';
import { VeiculoService } from '../veiculo.service';

@Component({
    selector: 'app-veiculo-detail',
    templateUrl: './veiculo-detail.component.html',
    styleUrls: ['./veiculo-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class VeiculoDetailComponent implements OnInit {

    veiculoId: string = "";
    imagens: string = environment.imagensUrl;
    isLoading: boolean = false;

    constructor(private veiculoService: VeiculoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.veiculoId = params['id']);
                }

    veiculo: Veiculo;
    veiculos: Veiculo[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.veiculoService.getById(this.veiculoId).subscribe(result => {
            this.veiculo = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.veiculoService.exportItemToPdf(this.veiculoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}