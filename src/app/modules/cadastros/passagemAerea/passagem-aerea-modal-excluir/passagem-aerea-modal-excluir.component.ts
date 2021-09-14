import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassagemAereaService } from '../passagemAerea.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-passagem-aerea-modal-excluir',
    templateUrl: './passagem-aerea-modal-excluir.component.html',
    styleUrls: ['./passagem-aerea-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PassagemAereaModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<PassagemAereaModalExcluirComponent>,
        private _passagemAereaService: PassagemAereaService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._passagemAereaService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Passagem excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
