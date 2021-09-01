import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AeronaveAbastecimentoService } from '../aeronaveAbastecimento.service';

@Component({
    selector: 'app-aeronave-abastecimento-modal-pdf',
    templateUrl: './aeronave-abastecimento-modal-pdf.component.html',
    styleUrls: ['./aeronave-abastecimento-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveAbastecimentoModalPdfComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<AeronaveAbastecimentoModalPdfComponent>,
                private _aeronaveAbastecimentoService: AeronaveAbastecimentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._aeronaveAbastecimentoService.exportToPdf(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
