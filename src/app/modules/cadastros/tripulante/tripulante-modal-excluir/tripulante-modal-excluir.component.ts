import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripulanteService } from '../tripulante.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tripulante-modal-excluir',
    templateUrl: './tripulante-modal-excluir.component.html',
    styleUrls: ['./tripulante-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TripulanteModalExcluirComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<TripulanteModalExcluirComponent>,
        private _tripulanteService: TripulanteService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    excluir() {
        this._tripulanteService.delete(this.data.id).subscribe(res => {
            console.log(res);
            this._toastr.success('Tripulante excluído com sucesso');
        }, error => {
            console.log(error);
            this._toastr.warning('Erro ao excluir');
        });

        this.dialogRef.close();
    }
}
