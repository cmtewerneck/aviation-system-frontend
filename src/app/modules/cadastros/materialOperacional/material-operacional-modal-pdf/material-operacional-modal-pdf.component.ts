import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialOperacionalService } from '../materialOperacional.service';

@Component({
    selector: 'app-material-operacional-modal-pdf',
    templateUrl: './material-operacional-modal-pdf.component.html',
    styleUrls: ['./material-operacional-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MaterialOperacionalModalPdfComponent implements OnInit {

    localizacao: string = "";

    constructor(
                public dialogRef: MatDialogRef<MaterialOperacionalModalPdfComponent>,
                private _materialOperacionalService: MaterialOperacionalService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._materialOperacionalService.exportToPdf(this.localizacao).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
