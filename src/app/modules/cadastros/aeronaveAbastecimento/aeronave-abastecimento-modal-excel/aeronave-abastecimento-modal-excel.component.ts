import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AeronaveAbastecimentoService } from '../aeronaveAbastecimento.service';

@Component({
    selector: 'app-aeronave-abastecimento-modal-excel',
    templateUrl: './aeronave-abastecimento-modal-excel.component.html',
    styleUrls: ['./aeronave-abastecimento-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveAbastecimentoModalExcelComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<AeronaveAbastecimentoModalExcelComponent>,
                private _aeronaveAbastecimentoService: AeronaveAbastecimentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._aeronaveAbastecimentoService.exportToExcel(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
