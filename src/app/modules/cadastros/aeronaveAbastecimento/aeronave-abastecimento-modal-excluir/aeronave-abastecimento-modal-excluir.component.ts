import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AeronaveAbastecimentoService } from '../aeronaveAbastecimento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-aeronave-abastecimento-modal-excluir',
    templateUrl: './aeronave-abastecimento-modal-excluir.component.html',
    styleUrls: ['./aeronave-abastecimento-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveAbastecimentoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<AeronaveAbastecimentoModalExcluirComponent>,
        private _aeronaveAbastecimentoService: AeronaveAbastecimentoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._aeronaveAbastecimentoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Abastecimento excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
