import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SuprimentoMovimentacaoService } from '../suprimentoMovimentacao.service';

@Component({
    selector: 'app-suprimento-movimentacao-modal-pdf',
    templateUrl: './suprimento-movimentacao-modal-pdf.component.html',
    styleUrls: ['./suprimento-movimentacao-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoMovimentacaoModalPdfComponent implements OnInit {

    itemNomenclatura: string = "";

    constructor(
                public dialogRef: MatDialogRef<SuprimentoMovimentacaoModalPdfComponent>,
                private _suprimentoMovimentacaoService: SuprimentoMovimentacaoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._suprimentoMovimentacaoService.exportToPdf(this.itemNomenclatura).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
