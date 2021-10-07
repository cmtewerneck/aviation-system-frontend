import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuprimentoMovimentacao } from '../suprimentoMovimentacao.model';
import { SuprimentoMovimentacaoService } from '../suprimentoMovimentacao.service';

@Component({
    selector: 'app-suprimento-movimentacao-detail',
    templateUrl: './suprimento-movimentacao-detail.component.html',
    styleUrls: ['./suprimento-movimentacao-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SuprimentoMovimentacaoDetailComponent implements OnInit {

    movimentacaoId: string = "";
    isLoading: boolean = false;

    constructor(private suprimentoMovimentacaoService: SuprimentoMovimentacaoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.movimentacaoId = params['id']);
                }

    movimentacao: SuprimentoMovimentacao;
    movimentacoes: SuprimentoMovimentacao[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.suprimentoMovimentacaoService.getById(this.movimentacaoId).subscribe(result => {
            this.movimentacao = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.suprimentoMovimentacaoService.exportItemToPdf(this.movimentacaoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}