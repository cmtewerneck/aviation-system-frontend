import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RevendedorService } from '../revendedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-revendedor-modal-excluir',
    templateUrl: './revendedor-modal-excluir.component.html',
    styleUrls: ['./revendedor-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RevendedorModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<RevendedorModalExcluirComponent>,
        private _revendedorService: RevendedorService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._revendedorService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Revendedor excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
