import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RastreadorService } from '../rastreador.service';

@Component({
    selector: 'app-rastreador-modal-pdf',
    templateUrl: './rastreador-modal-pdf.component.html',
    styleUrls: ['./rastreador-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RastreadorModalPdfComponent implements OnInit {

    modelo: string = "";

    constructor(
                public dialogRef: MatDialogRef<RastreadorModalPdfComponent>,
                private _rastreadorService: RastreadorService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._rastreadorService.exportToPdf(this.modelo).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
