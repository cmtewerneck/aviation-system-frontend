import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicoService } from '../servico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-servico-modal-excluir',
    templateUrl: './servico-modal-excluir.component.html',
    styleUrls: ['./servico-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ServicoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ServicoModalExcluirComponent>,
        private _servicoService: ServicoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._servicoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Serviço excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
