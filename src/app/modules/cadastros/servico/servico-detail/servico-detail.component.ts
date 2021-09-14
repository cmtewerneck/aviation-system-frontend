import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from '../servico.model';
import { ServicoService } from '../servico.service';

@Component({
    selector: 'app-servico-detail',
    templateUrl: './servico-detail.component.html',
    styleUrls: ['./servico-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ServicoDetailComponent implements OnInit {

    servicoId: string = "";
    isLoading: boolean = false;

    constructor(private servicoService: ServicoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.servicoId = params['id']);
                }

    servico: Servico;
    servicos: Servico[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.servicoService.getById(this.servicoId).subscribe(result => {
            this.servico = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.servicoService.exportItemToPdf(this.servicoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}