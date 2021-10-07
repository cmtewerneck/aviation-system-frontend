import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiariaService } from '../diaria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-diaria-modal-excluir',
    templateUrl: './diaria-modal-excluir.component.html',
    styleUrls: ['./diaria-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class DiariaModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DiariaModalExcluirComponent>,
        private _diariaService: DiariaService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._diariaService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Diária excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
