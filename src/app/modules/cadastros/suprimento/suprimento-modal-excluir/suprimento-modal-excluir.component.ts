import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuprimentoService } from '../suprimento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-suprimento-modal-excluir',
    templateUrl: './suprimento-modal-excluir.component.html',
    styleUrls: ['./suprimento-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<SuprimentoModalExcluirComponent>,
        private _suprimentoService: SuprimentoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._suprimentoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Suprimento excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
