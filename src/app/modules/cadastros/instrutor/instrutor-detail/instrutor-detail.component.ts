import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrutor } from '../instrutor.model';
import { InstrutorService } from '../instrutor.service';

@Component({
    selector: 'app-instrutor-detail',
    templateUrl: './instrutor-detail.component.html',
    styleUrls: ['./instrutor-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class InstrutorDetailComponent implements OnInit {

    instrutorId: string = "";
    isLoading: boolean = false;

    constructor(private instrutorService: InstrutorService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.instrutorId = params['id']);
                }

    instrutor: Instrutor;
    instrutores: Instrutor[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.instrutorService.getById(this.instrutorId).subscribe(result => {
            this.instrutor = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.instrutorService.exportItemToPdf(this.instrutorId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}