import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PanoramicoServicoService } from '../panoramicoServico.service';

@Component({
    selector: 'app-panoramico-servico-modal-excel',
    templateUrl: './panoramico-servico-modal-excel.component.html',
    styleUrls: ['./panoramico-servico-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoServicoModalExcelComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<PanoramicoServicoModalExcelComponent>,
                private _panoramicoServicoService: PanoramicoServicoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._panoramicoServicoService.exportToExcel(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
