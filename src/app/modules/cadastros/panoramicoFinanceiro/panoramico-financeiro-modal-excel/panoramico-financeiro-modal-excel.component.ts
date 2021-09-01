import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PanoramicoFinanceiroService } from '../panoramicoFinanceiro.service';

@Component({
    selector: 'app-panoramico-financeiro-modal-excel',
    templateUrl: './panoramico-financeiro-modal-excel.component.html',
    styleUrls: ['./panoramico-financeiro-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoFinanceiroModalExcelComponent implements OnInit {

    revendedor: string = "";

    constructor(
                public dialogRef: MatDialogRef<PanoramicoFinanceiroModalExcelComponent>,
                private _panoramicoFinanceiroService: PanoramicoFinanceiroService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._panoramicoFinanceiroService.exportToExcel(this.revendedor).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
