import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VeiculoMultaService } from '../veiculoMulta.service';

@Component({
    selector: 'app-veiculo-multa-modal-excel',
    templateUrl: './veiculo-multa-modal-excel.component.html',
    styleUrls: ['./veiculo-multa-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoMultaModalExcelComponent implements OnInit {

    placa: string = "";

    constructor(
                public dialogRef: MatDialogRef<VeiculoMultaModalExcelComponent>,
                private _veiculoMultaService: VeiculoMultaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._veiculoMultaService.exportToExcel(this.placa).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
