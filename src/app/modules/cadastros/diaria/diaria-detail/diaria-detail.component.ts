import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Diaria } from '../diaria.model';
import { DiariaService } from '../diaria.service';

@Component({
    selector: 'app-diaria-detail',
    templateUrl: './diaria-detail.component.html',
    styleUrls: ['./diaria-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DiariaDetailComponent implements OnInit {

    diariaId: string = "";
    isLoading: boolean = false;

    constructor(private diariaService: DiariaService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.diariaId = params['id']);
                }

    diaria: Diaria;
    diarias: Diaria[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.diariaService.getById(this.diariaId).subscribe(result => {
            this.diaria = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.diariaService.exportItemToPdf(this.diariaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}