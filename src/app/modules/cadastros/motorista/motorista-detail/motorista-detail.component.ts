import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motorista } from '../motorista.model';
import { MotoristaService } from '../motorista.service';

@Component({
    selector: 'app-motorista-detail',
    templateUrl: './motorista-detail.component.html',
    styleUrls: ['./motorista-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MotoristaDetailComponent implements OnInit {

    motoristaId: string = "";
    isLoading: boolean = false;

    constructor(private motoristaService: MotoristaService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.motoristaId = params['id']);
                }

    motorista: Motorista;
    motoristas: Motorista[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.motoristaService.getById(this.motoristaId).subscribe(result => {
            this.motorista = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.motoristaService.exportItemToPdf(this.motoristaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}