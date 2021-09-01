import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SuprimentoService } from '../suprimento.service';

@Component({
    selector: 'app-suprimento-edit',
    templateUrl: './suprimento-edit.component.html',
    styleUrls: ['./suprimento-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;
    isEditing: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _suprimentoService: SuprimentoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            codigo: [''],
            partNumber: ['', Validators.required],
            nomenclatura: ['', Validators.required],
            quantidade: ['', Validators.required],
            localizacao: [''],
            partNumberAlternativo: [''],
            aplicacao: [''],
            capitulo: [''],
            serialNumber: [''],
            doc: [''],
            imagem: ['']
        });

        if (this.id) // Update
        {
            this.loadEntity();
            this.isEditing = true;
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

        const $obs = this.id ? this._suprimentoService.update(model) : this._suprimentoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Suprimento atualizado com sucesso');
            else
                this._toastr.success('Suprimento criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._suprimentoService.getById(this.id).subscribe(model => {
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
