import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AeronaveService } from '../aeronave.service';

@Component({
    selector: 'app-aeronave-modal-pdf',
    templateUrl: './aeronave-modal-pdf.component.html',
    styleUrls: ['./aeronave-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveModalPdfComponent implements OnInit {

    categoria: string = "";

    constructor(
                public dialogRef: MatDialogRef<AeronaveModalPdfComponent>,
                private _aeronaveService: AeronaveService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._aeronaveService.exportToPdf(this.categoria).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
