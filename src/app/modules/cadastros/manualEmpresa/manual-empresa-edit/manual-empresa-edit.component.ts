import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ManualEmpresaService } from '../manualEmpresa.service';

@Component({
    selector: 'app-manual-empresa-edit',
    templateUrl: './manual-empresa-edit.component.html',
    styleUrls: ['./manual-empresa-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ManualEmpresaEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _manualEmpresaService: ManualEmpresaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            descricao: ['', Validators.required],
            sigla: ['', Validators.required],
            revisaoAtual: ['', Validators.required],
            dataRevisao: ['', Validators.required],
            revisaoAnalise: [''],
            arquivo: ['']
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    ngOnDestroy(): void {

    }

    cancel() {
        this.close.emit(false);
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        const model = this.mainForm.value;

        // CONVERSÕES PARA JSON
        if (model.revisaoAnalise) { model.revisaoAnalise = Number(model.revisaoAnalise); } else { model.revisaoAnalise = null; }
        // FIM DAS CONVERSÕES

        const $obs = this.id ? this._manualEmpresaService.update(model) : this._manualEmpresaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Manual atualizado com sucesso');
            else
                this._toastr.success('Manual criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._manualEmpresaService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    handleError(response: HttpErrorResponse) {
        if (typeof (response.error) === 'string') {
            this._toastr.error(response.error);
        }
        else {
            const messages = [];
            for (const key in response.error.errors) {
                response.error.errors[key].forEach(item => messages.push(item));
                // if (Object.prototype.hasOwnProperty.call(object, key)) {
                //     const element = object[key];
                // }
            }
            if (messages.length === 1)
                this._toastr.error(messages[0]);
            else
                this._toastr.error("- " + messages.join("<br>- "));
        }
    }

}
