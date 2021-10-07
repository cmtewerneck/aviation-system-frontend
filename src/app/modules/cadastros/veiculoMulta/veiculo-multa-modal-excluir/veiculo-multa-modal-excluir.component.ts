import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeiculoMultaService } from '../veiculoMulta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-veiculo-multa-modal-excluir',
    templateUrl: './veiculo-multa-modal-excluir.component.html',
    styleUrls: ['./veiculo-multa-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoMultaModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<VeiculoMultaModalExcluirComponent>,
        private _veiculoMultaService: VeiculoMultaService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._veiculoMultaService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Multa excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
