import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FerramentaService } from '../ferramenta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-ferramenta-modal-excluir',
    templateUrl: './ferramenta-modal-excluir.component.html',
    styleUrls: ['./ferramenta-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FerramentaModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<FerramentaModalExcluirComponent>,
        private _ferramentaService: FerramentaService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._ferramentaService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Ferramenta excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
