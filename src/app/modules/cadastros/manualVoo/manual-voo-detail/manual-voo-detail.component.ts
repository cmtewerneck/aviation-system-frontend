import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManualVoo } from '../manualVoo.model';
import { ManualVooService } from '../manualVoo.service';

@Component({
    selector: 'app-manual-voo-detail',
    templateUrl: './manual-voo-detail.component.html',
    styleUrls: ['./manual-voo-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ManualVooDetailComponent implements OnInit {

    manualId: string = "";
    isLoading: boolean = false;

    constructor(private manualVooService: ManualVooService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.manualId = params['id']);
                }

    manual: ManualVoo;
    manuais: ManualVoo[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.manualVooService.getById(this.manualId).subscribe(result => {
            this.manual = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.manualVooService.exportItemToPdf(this.manualId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}