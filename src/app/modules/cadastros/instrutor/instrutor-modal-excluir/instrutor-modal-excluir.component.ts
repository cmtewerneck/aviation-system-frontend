import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstrutorService } from '../instrutor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-instrutor-modal-excluir',
    templateUrl: './instrutor-modal-excluir.component.html',
    styleUrls: ['./instrutor-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class InstrutorModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<InstrutorModalExcluirComponent>,
        private _instrutorService: InstrutorService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._instrutorService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Instrutor excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
