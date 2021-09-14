import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassagemAerea } from '../passagemAerea.model';
import { PassagemAereaService } from '../passagemAerea.service';

@Component({
    selector: 'app-passagem-aerea-detail',
    templateUrl: './passagem-aerea-detail.component.html',
    styleUrls: ['./passagem-aerea-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PassagemAereaDetailComponent implements OnInit {

    passagemId: string = "";
    
    isLoading: boolean = false;

    constructor(private passagemAereaService: PassagemAereaService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.passagemId = params['id']);
                }

    passagem: PassagemAerea;
    passagens: PassagemAerea[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.passagemAereaService.getById(this.passagemId).subscribe(result => {
            this.passagem = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.passagemAereaService.exportItemToPdf(this.passagemId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}