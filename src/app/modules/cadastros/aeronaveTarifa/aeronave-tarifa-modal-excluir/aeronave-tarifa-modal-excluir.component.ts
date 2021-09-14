import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AeronaveTarifaService } from '../aeronaveTarifa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-aeronave-tarifa-modal-excluir',
    templateUrl: './aeronave-tarifa-modal-excluir.component.html',
    styleUrls: ['./aeronave-tarifa-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveTarifaModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<AeronaveTarifaModalExcluirComponent>,
        private _aeronaveTarifaService: AeronaveTarifaService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._aeronaveTarifaService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Tarifa excluída com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
