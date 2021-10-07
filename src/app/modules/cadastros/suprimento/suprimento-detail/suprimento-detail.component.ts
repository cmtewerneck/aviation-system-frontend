import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Suprimento } from '../suprimento.model';
import { SuprimentoService } from '../suprimento.service';

@Component({
    selector: 'app-suprimento-detail',
    templateUrl: './suprimento-detail.component.html',
    styleUrls: ['./suprimento-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SuprimentoDetailComponent implements OnInit {

    suprimentoId: string = "";
    isLoading: boolean = false;
    imagens: string = environment.imagensUrl;

    constructor(private suprimentoService: SuprimentoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.suprimentoId = params['id']);
                }

    suprimento: Suprimento;
    suprimentos: Suprimento[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.suprimentoService.getById(this.suprimentoId).subscribe(result => {
            this.suprimento = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.suprimentoService.exportItemToPdf(this.suprimentoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}