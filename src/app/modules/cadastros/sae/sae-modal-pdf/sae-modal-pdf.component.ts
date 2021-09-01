import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SaeService } from '../sae.service';

@Component({
    selector: 'app-sae-modal-pdf',
    templateUrl: './sae-modal-pdf.component.html',
    styleUrls: ['./sae-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SaeModalPdfComponent implements OnInit {

    nome: string = "";

    constructor(
                public dialogRef: MatDialogRef<SaeModalPdfComponent>,
                private _saeService: SaeService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._saeService.exportToPdf(this.nome).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
