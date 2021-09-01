import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaTreinamentoService } from '../categoriaTreinamento.service';

@Component({
    selector: 'app-categoria-treinamento-modal-excel',
    templateUrl: './categoria-treinamento-modal-excel.component.html',
    styleUrls: ['./categoria-treinamento-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CategoriaTreinamentoModalExcelComponent implements OnInit {

    tipoTreinamento: string = "";

    constructor(
                public dialogRef: MatDialogRef<CategoriaTreinamentoModalExcelComponent>,
                private _categoriaTreinamentoService: CategoriaTreinamentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._categoriaTreinamentoService.exportToExcel(this.tipoTreinamento).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
