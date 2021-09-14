import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendamentoService } from '../agendamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-agendamento-modal-excluir',
    templateUrl: './agendamento-modal-excluir.component.html',
    styleUrls: ['./agendamento-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AgendamentoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<AgendamentoModalExcluirComponent>,
        private _agendamentoService: AgendamentoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._agendamentoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Agendamento excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
