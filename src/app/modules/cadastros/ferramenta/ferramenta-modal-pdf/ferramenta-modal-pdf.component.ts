import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FerramentaService } from '../ferramenta.service';

@Component({
    selector: 'app-ferramenta-modal-pdf',
    templateUrl: './ferramenta-modal-pdf.component.html',
    styleUrls: ['./ferramenta-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FerramentaModalPdfComponent implements OnInit {

    localizacao: string = "";

    constructor(
                public dialogRef: MatDialogRef<FerramentaModalPdfComponent>,
                private _ferramentaService: FerramentaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._ferramentaService.exportToPdf(this.localizacao).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
