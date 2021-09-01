import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RastreadorService } from '../rastreador.service';

@Component({
    selector: 'app-rastreador-modal-excel',
    templateUrl: './rastreador-modal-excel.component.html',
    styleUrls: ['./rastreador-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RastreadorModalExcelComponent implements OnInit {

    modelo: string = "";

    constructor(
                public dialogRef: MatDialogRef<RastreadorModalExcelComponent>,
                private _rastreadorService: RastreadorService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._rastreadorService.exportToExcel(this.modelo).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
