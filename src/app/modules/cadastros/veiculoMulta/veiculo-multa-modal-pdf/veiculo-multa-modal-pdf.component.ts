import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VeiculoMultaService } from '../veiculoMulta.service';

@Component({
    selector: 'app-veiculo-multa-modal-pdf',
    templateUrl: './veiculo-multa-modal-pdf.component.html',
    styleUrls: ['./veiculo-multa-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoMultaModalPdfComponent implements OnInit {

    placa: string = "";

    constructor(
                public dialogRef: MatDialogRef<VeiculoMultaModalPdfComponent>,
                private _veiculoMultaService: VeiculoMultaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._veiculoMultaService.exportToPdf(this.placa).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
