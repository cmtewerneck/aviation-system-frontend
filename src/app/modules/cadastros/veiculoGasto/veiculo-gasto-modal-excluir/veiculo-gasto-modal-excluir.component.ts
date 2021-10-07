import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeiculoGastoService } from '../veiculoGasto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-veiculo-gasto-modal-excluir',
    templateUrl: './veiculo-gasto-modal-excluir.component.html',
    styleUrls: ['./veiculo-gasto-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoGastoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<VeiculoGastoModalExcluirComponent>,
        private _veiculoGastoService: VeiculoGastoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._veiculoGastoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Gasto excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
