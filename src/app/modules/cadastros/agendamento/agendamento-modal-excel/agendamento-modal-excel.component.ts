import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AgendamentoService } from '../agendamento.service';

@Component({
    selector: 'app-agendamento-modal-excel',
    templateUrl: './agendamento-modal-excel.component.html',
    styleUrls: ['./agendamento-modal-excel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AgendamentoModalExcelComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<AgendamentoModalExcelComponent>,
                private _agendamentoService: AgendamentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToExcel() {
        this._agendamentoService.exportToExcel(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
