import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NecService } from '../nec.service';

@Component({
    selector: 'app-nec-modal-pdf',
    templateUrl: './nec-modal-pdf.component.html',
    styleUrls: ['./nec-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class NecModalPdfComponent implements OnInit {

    tipoTreinamento: string = "";

    constructor(
                public dialogRef: MatDialogRef<NecModalPdfComponent>,
                private _necService: NecService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._necService.exportToPdf(this.tipoTreinamento).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
