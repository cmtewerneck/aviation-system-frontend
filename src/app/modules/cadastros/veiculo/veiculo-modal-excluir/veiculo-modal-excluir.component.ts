import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeiculoService } from '../veiculo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-veiculo-modal-excluir',
    templateUrl: './veiculo-modal-excluir.component.html',
    styleUrls: ['./veiculo-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<VeiculoModalExcluirComponent>,
        private _veiculoService: VeiculoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._veiculoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Veículo excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
