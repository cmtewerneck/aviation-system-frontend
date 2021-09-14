import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AeronaveTarifa } from '../aeronaveTarifa.model';
import { AeronaveTarifaService } from '../aeronaveTarifa.service';

@Component({
    selector: 'app-aeronave-tarifa-detail',
    templateUrl: './aeronave-tarifa-detail.component.html',
    styleUrls: ['./aeronave-tarifa-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AeronaveTarifaDetailComponent implements OnInit {

    tarifaId: string = "";
    
    isLoading: boolean = false;

    constructor(private aeronaveTarifaService: AeronaveTarifaService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.tarifaId = params['id']);
                }

    tarifa: AeronaveTarifa;
    tarifas: AeronaveTarifa[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.aeronaveTarifaService.getById(this.tarifaId).subscribe(result => {
            this.tarifa = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.aeronaveTarifaService.exportItemToPdf(this.tarifaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}