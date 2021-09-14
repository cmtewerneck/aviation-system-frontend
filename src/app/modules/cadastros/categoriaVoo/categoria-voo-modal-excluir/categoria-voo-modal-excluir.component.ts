import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaVooService } from '../categoriaVoo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-categoria-voo-modal-excluir',
    templateUrl: './categoria-voo-modal-excluir.component.html',
    styleUrls: ['./categoria-voo-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CategoriaVooModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CategoriaVooModalExcluirComponent>,
        private _categoriaVooService: CategoriaVooService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._categoriaVooService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Categoria excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
