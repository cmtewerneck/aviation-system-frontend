import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';

@Component({
    selector: 'app-aluno-detail',
    templateUrl: './aluno-detail.component.html',
    styleUrls: ['./aluno-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AlunoDetailComponent implements OnInit {

    alunoId: string = "";
    isLoading: boolean = false;

    constructor(private alunoService: AlunoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.alunoId = params['id']);
                }

    aluno: Aluno;
    alunos: Aluno[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.alunoService.getById(this.alunoId).subscribe(result => {
            this.aluno = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.alunoService.exportItemToPdf(this.alunoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}