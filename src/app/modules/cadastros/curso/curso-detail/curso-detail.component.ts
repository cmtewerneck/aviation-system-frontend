import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../curso.model';
import { CursoService } from '../curso.service';

@Component({
    selector: 'app-curso-detail',
    templateUrl: './curso-detail.component.html',
    styleUrls: ['./curso-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CursoDetailComponent implements OnInit {

    cursoId: string = "";
    isLoading: boolean = false;

    constructor(private cursoService: CursoService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.cursoId = params['id']);
                }

    curso: Curso;
    cursos: Curso[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.cursoService.getById(this.cursoId).subscribe(result => {
            this.curso = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.cursoService.exportItemToPdf(this.cursoId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}