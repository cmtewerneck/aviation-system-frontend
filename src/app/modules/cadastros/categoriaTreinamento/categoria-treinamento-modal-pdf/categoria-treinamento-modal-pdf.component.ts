import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaTreinamentoService } from '../categoriaTreinamento.service';

@Component({
    selector: 'app-categoria-treinamento-modal-pdf',
    templateUrl: './categoria-treinamento-modal-pdf.component.html',
    styleUrls: ['./categoria-treinamento-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CategoriaTreinamentoModalPdfComponent implements OnInit {

    tipoTreinamento: string = "";

    constructor(
                public dialogRef: MatDialogRef<CategoriaTreinamentoModalPdfComponent>,
                private _categoriaTreinamentoService: CategoriaTreinamentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._categoriaTreinamentoService.exportToPdf(this.tipoTreinamento).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
