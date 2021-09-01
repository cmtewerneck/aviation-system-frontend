import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FornecedorService } from '../fornecedor.service';

@Component({
    selector: 'app-fornecedor-modal-excluir',
    templateUrl: './fornecedor-modal-excluir.component.html',
    styleUrls: ['./fornecedor-modal-excluir.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FornecedorModalExcluirComponent implements OnInit {

    constructor(
                public dialogRef: MatDialogRef<FornecedorModalExcluirComponent>,
                private _fornecedorService: FornecedorService
                ) {}

    ngOnInit() {}

    cancel(): void {
        this.dialogRef.close();
    }

    // excluir() {
    //     this._fornecedorService.delete().subscribe(res => {
    //         console.log(res);
    //     }, error => {
    //         console.log(error);
    //     });

    //     this.dialogRef.close();
    // }
}
