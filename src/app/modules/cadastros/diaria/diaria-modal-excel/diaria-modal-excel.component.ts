import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DiariaService } from '../diaria.service';

@Component({
    selector: 'app-diaria-modal-excel',
    templateUrl: './diaria-modal-excel.component.html',
    styleUrls: ['./diaria-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class DiariaModalExcelComponent implements OnInit {

    nome: string = "";

    constructor(
                public dialogRef: MatDialogRef<DiariaModalExcelComponent>,
                private _diariaService: DiariaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._diariaService.exportToExcel(this.nome).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
