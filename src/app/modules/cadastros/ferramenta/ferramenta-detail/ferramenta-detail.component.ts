import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ferramenta } from '../ferramenta.model';
import { FerramentaService } from '../ferramenta.service';

@Component({
    selector: 'app-ferramenta-detail',
    templateUrl: './ferramenta-detail.component.html',
    styleUrls: ['./ferramenta-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FerramentaDetailComponent implements OnInit {

    ferramentaId: string = "";
    
    isLoading: boolean = false;

    constructor(private ferramentaService: FerramentaService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.ferramentaId = params['id']);
                }

    ferramenta: Ferramenta;
    ferramentas: Ferramenta[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.ferramentaService.getById(this.ferramentaId).subscribe(result => {
            this.ferramenta = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.ferramentaService.exportItemToPdf(this.ferramentaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}