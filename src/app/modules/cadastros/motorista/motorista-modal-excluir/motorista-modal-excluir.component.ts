import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotoristaService } from '../motorista.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-motorista-modal-excluir',
    templateUrl: './motorista-modal-excluir.component.html',
    styleUrls: ['./motorista-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MotoristaModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<MotoristaModalExcluirComponent>,
        private _motoristaService: MotoristaService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._motoristaService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Motorista excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
