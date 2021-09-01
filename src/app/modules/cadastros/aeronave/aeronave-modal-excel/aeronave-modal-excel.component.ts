import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AeronaveService } from '../aeronave.service';

@Component({
    selector: 'app-aeronave-modal-excel',
    templateUrl: './aeronave-modal-excel.component.html',
    styleUrls: ['./aeronave-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveModalExcelComponent implements OnInit {

    categoria: string = "";

    constructor(
                public dialogRef: MatDialogRef<AeronaveModalExcelComponent>,
                private _aeronaveService: AeronaveService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._aeronaveService.exportToExcel(this.categoria).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
