import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaVoo } from '../categoriaVoo.model';
import { CategoriaVooService } from '../categoriaVoo.service';

@Component({
    selector: 'app-categoria-voo-detail',
    templateUrl: './categoria-voo-detail.component.html',
    styleUrls: ['./categoria-voo-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CategoriaVooDetailComponent implements OnInit {

    categoriaId: string = "";
    isLoading: boolean = false;

    constructor(private categoriaVooService: CategoriaVooService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.categoriaId = params['id']);
                }

    categoria: CategoriaVoo;
    categorias: CategoriaVoo[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.categoriaVooService.getById(this.categoriaId).subscribe(result => {
            this.categoria = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.categoriaVooService.exportItemToPdf(this.categoriaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}