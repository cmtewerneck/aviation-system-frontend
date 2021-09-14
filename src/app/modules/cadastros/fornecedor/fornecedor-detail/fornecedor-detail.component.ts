import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-fornecedor-detail',
    templateUrl: './fornecedor-detail.component.html',
    styleUrls: ['./fornecedor-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FornecedorDetailComponent implements OnInit {

    fornecedorId: string = "";
    isLoading: boolean = false;
    imagens: string = environment.imagensUrl;

    constructor(private fornecedorService: FornecedorService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.fornecedorId = params['id']);
                }

    fornecedor: Fornecedor;
    fornecedors: Fornecedor[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.fornecedorService.getById(this.fornecedorId).subscribe(result => {
            this.fornecedor = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.fornecedorService.exportItemToPdf(this.fornecedorId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}