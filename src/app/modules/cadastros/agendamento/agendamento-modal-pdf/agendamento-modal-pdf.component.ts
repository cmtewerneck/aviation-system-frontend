import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AgendamentoService } from '../agendamento.service';

@Component({
    selector: 'app-agendamento-modal-pdf',
    templateUrl: './agendamento-modal-pdf.component.html',
    styleUrls: ['./agendamento-modal-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AgendamentoModalPdfComponent implements OnInit {

    matricula: string = "";

    constructor(
                public dialogRef: MatDialogRef<AgendamentoModalPdfComponent>,
                private _agendamentoService: AgendamentoService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    exportToPdf() {
        this._agendamentoService.exportToPdf(this.matricula).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });

        this.dialogRef.close();
    }
}
