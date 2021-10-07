import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PanoramicoServicoService } from '../panoramicoServico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-panoramico-servico-modal-excluir',
    templateUrl: './panoramico-servico-modal-excluir.component.html',
    styleUrls: ['./panoramico-servico-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoServicoModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<PanoramicoServicoModalExcluirComponent>,
        private _panoramicoServicoService: PanoramicoServicoService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._panoramicoServicoService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Serviço excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
