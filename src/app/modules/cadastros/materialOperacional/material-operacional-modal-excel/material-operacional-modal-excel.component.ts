import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialOperacionalService } from '../materialOperacional.service';

@Component({
    selector: 'app-material-operacional-modal-excel',
    templateUrl: './material-operacional-modal-excel.component.html',
    styleUrls: ['./material-operacional-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MaterialOperacionalModalExcelComponent implements OnInit {

    localizacao: string = "";

    constructor(
                public dialogRef: MatDialogRef<MaterialOperacionalModalExcelComponent>,
                private _materialOperacionalService: MaterialOperacionalService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._materialOperacionalService.exportToExcel(this.localizacao).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
