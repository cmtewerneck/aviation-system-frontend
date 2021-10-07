import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MecanicoService } from '../mecanico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-mecanico-modal-excluir',
    templateUrl: './mecanico-modal-excluir.component.html',
    styleUrls: ['./mecanico-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MecanicoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<MecanicoModalExcluirComponent>,
        private _mecanicoService: MecanicoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._mecanicoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Mecânico excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
