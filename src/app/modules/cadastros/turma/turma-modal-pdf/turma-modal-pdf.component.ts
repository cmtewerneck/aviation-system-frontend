import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TurmaService } from '../turma.service';

@Component({
    selector: 'app-turma-modal-pdf',
    templateUrl: './turma-modal-pdf.component.html',
    styleUrls: ['./turma-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TurmaModalPdfComponent implements OnInit {

    curso: string = "";

    constructor(
                public dialogRef: MatDialogRef<TurmaModalPdfComponent>,
                private _turmaService: TurmaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._turmaService.exportToPdf(this.curso).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
