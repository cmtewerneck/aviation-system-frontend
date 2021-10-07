import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tripulante } from '../tripulante.model';
import { TripulanteService } from '../tripulante.service';

@Component({
    selector: 'app-tripulante-detail',
    templateUrl: './tripulante-detail.component.html',
    styleUrls: ['./tripulante-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TripulanteDetailComponent implements OnInit {

    tripulanteId: string = "";
    isLoading: boolean = false;

    constructor(private tripulanteService: TripulanteService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.tripulanteId = params['id']);
                }

    tripulante: Tripulante;
    tripulantes: Tripulante[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.tripulanteService.getById(this.tripulanteId).subscribe(result => {
            this.tripulante = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.tripulanteService.exportItemToPdf(this.tripulanteId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}