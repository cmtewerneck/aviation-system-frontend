import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContratoService } from '../contrato.service';

@Component({
    selector: 'app-contrato-modal-excel',
    templateUrl: './contrato-modal-excel.component.html',
    styleUrls: ['./contrato-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ContratoModalExcelComponent implements OnInit {

    contratante: string = "";

    constructor(
                public dialogRef: MatDialogRef<ContratoModalExcelComponent>,
                private _contratoService: ContratoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._contratoService.exportToExcel(this.contratante).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
