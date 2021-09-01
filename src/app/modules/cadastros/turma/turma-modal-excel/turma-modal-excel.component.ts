import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TurmaService } from '../turma.service';

@Component({
    selector: 'app-turma-modal-excel',
    templateUrl: './turma-modal-excel.component.html',
    styleUrls: ['./turma-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TurmaModalExcelComponent implements OnInit {

    curso: string = "";

    constructor(
                public dialogRef: MatDialogRef<TurmaModalExcelComponent>,
                private _turmaService: TurmaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._turmaService.exportToExcel(this.curso).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
