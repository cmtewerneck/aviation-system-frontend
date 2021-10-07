import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContaPagarService } from '../contaPagar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-conta-pagar-modal-excluir',
    templateUrl: './conta-pagar-modal-excluir.component.html',
    styleUrls: ['./conta-pagar-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ContaPagarModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ContaPagarModalExcluirComponent>,
        private _contaPagarService: ContaPagarService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._contaPagarService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Conta excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
