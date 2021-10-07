import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlunoService } from '../aluno.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-aluno-modal-excluir',
    templateUrl: './aluno-modal-excluir.component.html',
    styleUrls: ['./aluno-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AlunoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<AlunoModalExcluirComponent>,
        private _alunoService: AlunoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._alunoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Aluno excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
