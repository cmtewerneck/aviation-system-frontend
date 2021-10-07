import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PanoramicoFinanceiroService } from '../panoramicoFinanceiro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-panoramico-financeiro-modal-excluir',
    templateUrl: './panoramico-financeiro-modal-excluir.component.html',
    styleUrls: ['./panoramico-financeiro-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoFinanceiroModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<PanoramicoFinanceiroModalExcluirComponent>,
        private _panoramicoFinanceiroService: PanoramicoFinanceiroService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._panoramicoFinanceiroService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Financeiro excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
