import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialOperacional } from '../materialOperacional.model';
import { MaterialOperacionalService } from '../materialOperacional.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-material-operacional-detail',
    templateUrl: './material-operacional-detail.component.html',
    styleUrls: ['./material-operacional-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MaterialOperacionalDetailComponent implements OnInit {

    materialId: string = "";
    
    isLoading: boolean = false;
    imagens: string = environment.imagensUrl;

    constructor(private materialOperacionalService: MaterialOperacionalService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.materialId = params['id']);
                }

    materialOperacional: MaterialOperacional;
    materiais: MaterialOperacional[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.materialOperacionalService.getById(this.materialId).subscribe(result => {
            this.materialOperacional = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.materialOperacionalService.exportItemToPdf(this.materialId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}