import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursoService } from '../curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-curso-modal-excluir',
    templateUrl: './curso-modal-excluir.component.html',
    styleUrls: ['./curso-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CursoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CursoModalExcluirComponent>,
        private _cursoService: CursoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._cursoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Curso excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
