import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AeronaveTarifaService } from '../aeronaveTarifa.service';

@Component({
    selector: 'app-aeronave-tarifa-modal-pdf',
    templateUrl: './aeronave-tarifa-modal-pdf.component.html',
    styleUrls: ['./aeronave-tarifa-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveTarifaModalPdfComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<AeronaveTarifaModalPdfComponent>,
                private _aeronaveTarifaService: AeronaveTarifaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._aeronaveTarifaService.exportToPdf(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
