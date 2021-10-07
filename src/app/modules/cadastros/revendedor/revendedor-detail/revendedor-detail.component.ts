import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Revendedor } from '../revendedor.model';
import { RevendedorService } from '../revendedor.service';

@Component({
    selector: 'app-revendedor-detail',
    templateUrl: './revendedor-detail.component.html',
    styleUrls: ['./revendedor-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class RevendedorDetailComponent implements OnInit {

    revendedorId: string = "";
    isLoading: boolean = false;

    constructor(private revendedorService: RevendedorService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.revendedorId = params['id']);
                }

    revendedor: Revendedor;
    revendedores: Revendedor[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.revendedorService.getById(this.revendedorId).subscribe(result => {
            this.revendedor = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.revendedorService.exportItemToPdf(this.revendedorId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}