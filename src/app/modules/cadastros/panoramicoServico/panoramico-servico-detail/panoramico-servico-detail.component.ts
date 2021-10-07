import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanoramicoServico } from '../panoramicoServico.model';
import { PanoramicoServicoService } from '../panoramicoServico.service';

@Component({
    selector: 'app-panoramico-servico-detail',
    templateUrl: './panoramico-servico-detail.component.html',
    styleUrls: ['./panoramico-servico-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PanoramicoServicoDetailComponent implements OnInit {

    servicoId: string = "";
    isLoading: boolean = false;

    constructor(private panoramicoServicoService: PanoramicoServicoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.servicoId = params['id']);
                }

    servico: PanoramicoServico;
    servicos: PanoramicoServico[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.panoramicoServicoService.getById(this.servicoId).subscribe(result => {
            this.servico = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.panoramicoServicoService.exportItemToPdf(this.servicoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}