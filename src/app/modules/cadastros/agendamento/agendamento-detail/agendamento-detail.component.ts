import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from '../agendamento.model';
import { AgendamentoService } from '../agendamento.service';

@Component({
    selector: 'app-agendamento-detail',
    templateUrl: './agendamento-detail.component.html',
    styleUrls: ['./agendamento-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AgendamentoDetailComponent implements OnInit {

    agendamentoId: string = "";
    
    isLoading: boolean = false;

    constructor(private agendamentoService: AgendamentoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.agendamentoId = params['id']);
                }

    agendamento: Agendamento;
    agendamentos: Agendamento[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.agendamentoService.getById(this.agendamentoId).subscribe(result => {
            this.agendamento = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.agendamentoService.exportItemToPdf(this.agendamentoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}