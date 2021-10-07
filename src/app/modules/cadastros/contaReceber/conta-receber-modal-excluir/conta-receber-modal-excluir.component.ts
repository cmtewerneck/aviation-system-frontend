import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContaReceberService } from '../contaReceber.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-conta-receber-modal-excluir',
    templateUrl: './conta-receber-modal-excluir.component.html',
    styleUrls: ['./conta-receber-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ContaReceberModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ContaReceberModalExcluirComponent>,
        private _contaReceberService: ContaReceberService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._contaReceberService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Conta excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
