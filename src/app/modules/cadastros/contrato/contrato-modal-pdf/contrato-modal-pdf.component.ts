import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContratoService } from '../contrato.service';

@Component({
    selector: 'app-contrato-modal-pdf',
    templateUrl: './contrato-modal-pdf.component.html',
    styleUrls: ['./contrato-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ContratoModalPdfComponent implements OnInit {

    contratante: string = "";

    constructor(
                public dialogRef: MatDialogRef<ContratoModalPdfComponent>,
                private _contratoService: ContratoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._contratoService.exportToPdf(this.contratante).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
