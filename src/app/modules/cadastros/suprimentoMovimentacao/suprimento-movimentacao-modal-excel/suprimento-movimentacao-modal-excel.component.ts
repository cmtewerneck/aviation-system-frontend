import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SuprimentoMovimentacaoService } from '../suprimentoMovimentacao.service';

@Component({
    selector: 'app-suprimento-movimentacao-modal-excel',
    templateUrl: './suprimento-movimentacao-modal-excel.component.html',
    styleUrls: ['./suprimento-movimentacao-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoMovimentacaoModalExcelComponent implements OnInit {

    itemNomenclatura: string = "";

    constructor(
                public dialogRef: MatDialogRef<SuprimentoMovimentacaoModalExcelComponent>,
                private _suprimentoMovimentacaoService: SuprimentoMovimentacaoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._suprimentoMovimentacaoService.exportToExcel(this.itemNomenclatura).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
