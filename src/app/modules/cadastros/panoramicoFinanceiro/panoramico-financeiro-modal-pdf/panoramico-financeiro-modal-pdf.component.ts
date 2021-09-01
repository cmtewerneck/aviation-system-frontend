import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PanoramicoFinanceiroService } from '../panoramicoFinanceiro.service';

@Component({
    selector: 'app-panoramico-financeiro-modal-pdf',
    templateUrl: './panoramico-financeiro-modal-pdf.component.html',
    styleUrls: ['./panoramico-financeiro-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoFinanceiroModalPdfComponent implements OnInit {

    revendedor: string = "";

    constructor(
                public dialogRef: MatDialogRef<PanoramicoFinanceiroModalPdfComponent>,
                private _panoramicoFinanceiroService: PanoramicoFinanceiroService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._panoramicoFinanceiroService.exportToPdf(this.revendedor).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
