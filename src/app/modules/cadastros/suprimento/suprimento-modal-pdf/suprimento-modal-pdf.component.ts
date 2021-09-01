import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SuprimentoService } from '../suprimento.service';

@Component({
    selector: 'app-suprimento-modal-pdf',
    templateUrl: './suprimento-modal-pdf.component.html',
    styleUrls: ['./suprimento-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoModalPdfComponent implements OnInit {

    localizacao: string = "";

    constructor(
                public dialogRef: MatDialogRef<SuprimentoModalPdfComponent>,
                private _suprimentoService: SuprimentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._suprimentoService.exportToPdf(this.localizacao).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
