import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NrtService } from '../nrt.service';

@Component({
    selector: 'app-nrt-modal-pdf',
    templateUrl: './nrt-modal-pdf.component.html',
    styleUrls: ['./nrt-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class NrtModalPdfComponent implements OnInit {

    tipoTreinamento: string = "";

    constructor(
                public dialogRef: MatDialogRef<NrtModalPdfComponent>,
                private _nrtService: NrtService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._nrtService.exportToPdf(this.tipoTreinamento).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
