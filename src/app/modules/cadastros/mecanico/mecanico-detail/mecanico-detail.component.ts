import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mecanico } from '../mecanico.model';
import { MecanicoService } from '../mecanico.service';

@Component({
    selector: 'app-mecanico-detail',
    templateUrl: './mecanico-detail.component.html',
    styleUrls: ['./mecanico-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MecanicoDetailComponent implements OnInit {

    mecanicoId: string = "";
    isLoading: boolean = false;

    constructor(private mecanicoService: MecanicoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.mecanicoId = params['id']);
                }

    mecanico: Mecanico;
    mecanicos: Mecanico[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.mecanicoService.getById(this.mecanicoId).subscribe(result => {
            this.mecanico = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.mecanicoService.exportItemToPdf(this.mecanicoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}