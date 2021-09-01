import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PanoramicoServicoService } from '../panoramicoServico.service';

@Component({
    selector: 'app-panoramico-servico-modal-pdf',
    templateUrl: './panoramico-servico-modal-pdf.component.html',
    styleUrls: ['./panoramico-servico-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoServicoModalPdfComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<PanoramicoServicoModalPdfComponent>,
                private _panoramicoServicoService: PanoramicoServicoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._panoramicoServicoService.exportToPdf(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
