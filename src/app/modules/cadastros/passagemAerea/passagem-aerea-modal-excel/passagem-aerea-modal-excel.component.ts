import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PassagemAereaService } from '../passagemAerea.service';

@Component({
    selector: 'app-passagem-aerea-modal-excel',
    templateUrl: './passagem-aerea-modal-excel.component.html',
    styleUrls: ['./passagem-aerea-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PassagemAereaModalExcelComponent implements OnInit {

    tripulante: string = "";

    constructor(
                public dialogRef: MatDialogRef<PassagemAereaModalExcelComponent>,
                private _passagemAereaService: PassagemAereaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._passagemAereaService.exportToExcel(this.tripulante).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
