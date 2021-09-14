import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialOperacionalService } from '../materialOperacional.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-material-operacional-modal-excluir',
    templateUrl: './material-operacional-modal-excluir.component.html',
    styleUrls: ['./material-operacional-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MaterialOperacionalModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<MaterialOperacionalModalExcluirComponent>,
        private _materialOperacionalService: MaterialOperacionalService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._materialOperacionalService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Material excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
