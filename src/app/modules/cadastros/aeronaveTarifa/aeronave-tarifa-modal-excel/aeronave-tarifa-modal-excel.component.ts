import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AeronaveTarifaService } from '../aeronaveTarifa.service';

@Component({
    selector: 'app-aeronave-tarifa-modal-excel',
    templateUrl: './aeronave-tarifa-modal-excel.component.html',
    styleUrls: ['./aeronave-tarifa-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveTarifaModalExcelComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<AeronaveTarifaModalExcelComponent>,
                private _aeronaveTarifaService: AeronaveTarifaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._aeronaveTarifaService.exportToExcel(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
