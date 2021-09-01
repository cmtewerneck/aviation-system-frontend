import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NrtService } from '../nrt.service';

@Component({
    selector: 'app-nrt-modal-excel',
    templateUrl: './nrt-modal-excel.component.html',
    styleUrls: ['./nrt-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class NrtModalExcelComponent implements OnInit {

    tipoTreinamento: string = "";

    constructor(
                public dialogRef: MatDialogRef<NrtModalExcelComponent>,
                private _nrtService: NrtService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._nrtService.exportToExcel(this.tipoTreinamento).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
