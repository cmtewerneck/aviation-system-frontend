import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rastreador } from '../rastreador.model';
import { RastreadorService } from '../rastreador.service';

@Component({
    selector: 'app-rastreador-detail',
    templateUrl: './rastreador-detail.component.html',
    styleUrls: ['./rastreador-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class RastreadorDetailComponent implements OnInit {

    rastreadorId: string = "";
    
    isLoading: boolean = false;

    constructor(private rastreadorService: RastreadorService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.rastreadorId = params['id']);
                }

    rastreador: Rastreador;
    rastreadores: Rastreador[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.rastreadorService.getById(this.rastreadorId).subscribe(result => {
            this.rastreador = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.rastreadorService.exportItemToPdf(this.rastreadorId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}