import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SuprimentoService } from '../suprimento.service';

@Component({
    selector: 'app-suprimento-modal-excel',
    templateUrl: './suprimento-modal-excel.component.html',
    styleUrls: ['./suprimento-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoModalExcelComponent implements OnInit {

    localizacao: string = "";

    constructor(
                public dialogRef: MatDialogRef<SuprimentoModalExcelComponent>,
                private _suprimentoService: SuprimentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._suprimentoService.exportToExcel(this.localizacao).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
