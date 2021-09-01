import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SaeService } from '../sae.service';

@Component({
    selector: 'app-sae-modal-excel',
    templateUrl: './sae-modal-excel.component.html',
    styleUrls: ['./sae-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SaeModalExcelComponent implements OnInit {

    nome: string = "";

    constructor(
                public dialogRef: MatDialogRef<SaeModalExcelComponent>,
                private _saeService: SaeService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._saeService.exportToExcel(this.nome).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
