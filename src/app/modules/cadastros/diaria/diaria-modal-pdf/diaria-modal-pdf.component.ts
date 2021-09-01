import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DiariaService } from '../diaria.service';

@Component({
    selector: 'app-diaria-modal-pdf',
    templateUrl: './diaria-modal-pdf.component.html',
    styleUrls: ['./diaria-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class DiariaModalPdfComponent implements OnInit {

    nome: string = "";

    constructor(
                public dialogRef: MatDialogRef<DiariaModalPdfComponent>,
                private _diariaService: DiariaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._diariaService.exportToPdf(this.nome).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
