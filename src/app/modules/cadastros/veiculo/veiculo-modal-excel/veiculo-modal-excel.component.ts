import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoCombustivelEnum } from '../tipoCombustivel.enum';
import { VeiculoService } from '../veiculo.service';

@Component({
    selector: 'app-veiculo-modal-excel',
    templateUrl: './veiculo-modal-excel.component.html',
    styleUrls: ['./veiculo-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoModalExcelComponent implements OnInit {

    tipoCombustivel?: TipoCombustivelEnum;

    constructor(
                public dialogRef: MatDialogRef<VeiculoModalExcelComponent>,
                private _veiculoService: VeiculoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._veiculoService.exportToExcel(this.tipoCombustivel).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
