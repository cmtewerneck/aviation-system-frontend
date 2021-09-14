import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaTreinamento } from '../categoriaTreinamento.model';
import { CategoriaTreinamentoService } from '../categoriaTreinamento.service';

@Component({
    selector: 'app-categoria-treinamento-detail',
    templateUrl: './categoria-treinamento-detail.component.html',
    styleUrls: ['./categoria-treinamento-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CategoriaTreinamentoDetailComponent implements OnInit {

    categoriaId: string = "";
    
    isLoading: boolean = false;

    constructor(private categoriaTreinamentoService: CategoriaTreinamentoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.categoriaId = params['id']);
                }

    categoria: CategoriaTreinamento;
    categorias: CategoriaTreinamento[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.categoriaTreinamentoService.getById(this.categoriaId).subscribe(result => {
            this.categoria = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.categoriaTreinamentoService.exportItemToPdf(this.categoriaId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}