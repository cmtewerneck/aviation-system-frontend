import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManualEmpresaService } from '../manualEmpresa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-manual-empresa-modal-excluir',
    templateUrl: './manual-empresa-modal-excluir.component.html',
    styleUrls: ['./manual-empresa-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ManualEmpresaModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManualEmpresaModalExcluirComponent>,
        private _manualEmpresaService: ManualEmpresaService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._manualEmpresaService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Manual excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
