import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NecService } from '../nec.service';

@Component({
    selector: 'app-nec-modal-excel',
    templateUrl: './nec-modal-excel.component.html',
    styleUrls: ['./nec-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class NecModalExcelComponent implements OnInit {

    tipoTreinamento: string = "";

    constructor(
                public dialogRef: MatDialogRef<NecModalExcelComponent>,
                private _necService: NecService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._necService.exportToExcel(this.tipoTreinamento).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
