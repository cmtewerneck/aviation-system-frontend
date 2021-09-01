import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PassagemAereaService } from '../passagemAerea.service';

@Component({
    selector: 'app-passagem-aerea-modal-pdf',
    templateUrl: './passagem-aerea-modal-pdf.component.html',
    styleUrls: ['./passagem-aerea-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PassagemAereaModalPdfComponent implements OnInit {

    tripulante: string = "";

    constructor(
                public dialogRef: MatDialogRef<PassagemAereaModalPdfComponent>,
                private _passagemAereaService: PassagemAereaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._passagemAereaService.exportToPdf(this.tripulante).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
