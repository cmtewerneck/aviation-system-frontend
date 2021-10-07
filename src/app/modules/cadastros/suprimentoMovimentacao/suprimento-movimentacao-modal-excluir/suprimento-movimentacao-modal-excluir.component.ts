import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuprimentoMovimentacaoService } from '../suprimentoMovimentacao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-suprimento-movimentacao-modal-excluir',
    templateUrl: './suprimento-movimentacao-modal-excluir.component.html',
    styleUrls: ['./suprimento-movimentacao-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoMovimentacaoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<SuprimentoMovimentacaoModalExcluirComponent>,
        private _suprimentoMovimentacaoService: SuprimentoMovimentacaoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._suprimentoMovimentacaoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Movimentação excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
