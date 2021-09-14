import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratoService } from '../contrato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-contrato-modal-excluir',
    templateUrl: './contrato-modal-excluir.component.html',
    styleUrls: ['./contrato-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ContratoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ContratoModalExcluirComponent>,
        private _contratoService: ContratoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._contratoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Contrato excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
