import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManualEmpresa } from '../manualEmpresa.model';
import { ManualEmpresaService } from '../manualEmpresa.service';

@Component({
    selector: 'app-manual-empresa-detail',
    templateUrl: './manual-empresa-detail.component.html',
    styleUrls: ['./manual-empresa-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ManualEmpresaDetailComponent implements OnInit {

    manualId: string = "";
    isLoading: boolean = false;

    constructor(private manualEmpresaService: ManualEmpresaService, 
                private route: ActivatedRoute,
                private router: Router) { 
                    this.route.params.subscribe(params => this.manualId = params['id']);
                }

    manual: ManualEmpresa;
    manuais: ManualEmpresa[] = [];

    ngOnInit(){
        this.isLoading = true;
        this.manualEmpresaService.getById(this.manualId).subscribe(result => {
            this.manual = result;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    exportToPdf() {
        this.manualEmpresaService.exportItemToPdf(this.manualId).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}