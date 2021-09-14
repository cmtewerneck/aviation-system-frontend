import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RastreadorService } from '../rastreador.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-rastreador-modal-excluir',
    templateUrl: './rastreador-modal-excluir.component.html',
    styleUrls: ['./rastreador-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RastreadorModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<RastreadorModalExcluirComponent>,
        private _rastreadorService: RastreadorService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._rastreadorService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Rastreador excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
