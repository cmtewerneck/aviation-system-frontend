import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManualVooService } from '../manualVoo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-manual-voo-modal-excluir',
    templateUrl: './manual-voo-modal-excluir.component.html',
    styleUrls: ['./manual-voo-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ManualVooModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManualVooModalExcluirComponent>,
        private _manualVooService: ManualVooService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._manualVooService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Manual excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
