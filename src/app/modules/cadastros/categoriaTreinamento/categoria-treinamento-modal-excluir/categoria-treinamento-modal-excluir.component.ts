import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaTreinamentoService } from '../categoriaTreinamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-categoria-treinamento-modal-excluir',
    templateUrl: './categoria-treinamento-modal-excluir.component.html',
    styleUrls: ['./categoria-treinamento-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CategoriaTreinamentoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CategoriaTreinamentoModalExcluirComponent>,
        private _categoriaTreinamentoService: CategoriaTreinamentoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._categoriaTreinamentoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Categoria excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
