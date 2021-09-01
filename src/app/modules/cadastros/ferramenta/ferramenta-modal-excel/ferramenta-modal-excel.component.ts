import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FerramentaService } from '../ferramenta.service';

@Component({
    selector: 'app-ferramenta-modal-excel',
    templateUrl: './ferramenta-modal-excel.component.html',
    styleUrls: ['./ferramenta-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FerramentaModalExcelComponent implements OnInit {

    localizacao: string = "";

    constructor(
                public dialogRef: MatDialogRef<FerramentaModalExcelComponent>,
                private _ferramentaService: FerramentaService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._ferramentaService.exportToExcel(this.localizacao).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
