import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VeiculoGastoService } from '../veiculoGasto.service';

@Component({
    selector: 'app-veiculo-gasto-modal-excel',
    templateUrl: './veiculo-gasto-modal-excel.component.html',
    styleUrls: ['./veiculo-gasto-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoGastoModalExcelComponent implements OnInit {

    placa: string = "";

    constructor(
                public dialogRef: MatDialogRef<VeiculoGastoModalExcelComponent>,
                private _veiculoGastoService: VeiculoGastoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._veiculoGastoService.exportToExcel(this.placa).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
