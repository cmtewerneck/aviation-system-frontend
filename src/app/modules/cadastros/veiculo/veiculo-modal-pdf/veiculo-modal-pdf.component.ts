import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoCombustivelEnum } from '../tipoCombustivel.enum';
import { VeiculoService } from '../veiculo.service';

@Component({
    selector: 'app-veiculo-modal-pdf',
    templateUrl: './veiculo-modal-pdf.component.html',
    styleUrls: ['./veiculo-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoModalPdfComponent implements OnInit {

    tipoCombustivel?: TipoCombustivelEnum;

    constructor(
                public dialogRef: MatDialogRef<VeiculoModalPdfComponent>,
                private _veiculoService: VeiculoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._veiculoService.exportToPdf(this.tipoCombustivel).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
