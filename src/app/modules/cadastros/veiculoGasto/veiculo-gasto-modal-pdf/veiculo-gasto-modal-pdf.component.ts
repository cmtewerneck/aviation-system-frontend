import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VeiculoGastoService } from '../veiculoGasto.service';

@Component({
    selector: 'app-veiculo-gasto-modal-pdf',
    templateUrl: './veiculo-gasto-modal-pdf.component.html',
    styleUrls: ['./veiculo-gasto-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoGastoModalPdfComponent implements OnInit {

    placa: string = "";

    constructor(
                public dialogRef: MatDialogRef<VeiculoGastoModalPdfComponent>,
                private _veiculoGastoService: VeiculoGastoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._veiculoGastoService.exportToPdf(this.placa).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
