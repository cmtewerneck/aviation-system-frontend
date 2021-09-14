import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FornecedorService } from '../fornecedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-fornecedor-modal-excluir',
    templateUrl: './fornecedor-modal-excluir.component.html',
    styleUrls: ['./fornecedor-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FornecedorModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<FornecedorModalExcluirComponent>,
        private _fornecedorService: FornecedorService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._fornecedorService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Fornecedor excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
