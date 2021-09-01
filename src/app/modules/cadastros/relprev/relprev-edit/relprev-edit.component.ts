import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RelprevService } from '../relprev.service';

@Component({
    selector: 'app-relprev-edit',
    templateUrl: './relprev-edit.component.html',
    styleUrls: ['./relprev-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RelprevEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _relprevService: RelprevService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            dataHora: ['', Validators.required],
            aeroporto: ['', Validators.required],
            assunto: ['', Validators.required],
            local: ['', Validators.required],
            pessoalEnvolvido: ['', Validators.required],
            organizacao: [''],
            mensagem: ['', Validators.required],
            nome: [''],
            email: ['', Validators.email],
            telefone: ['']
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

        const $obs = this.id ? this._relprevService.update(model) : this._relprevService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Relprev atualizado com sucesso');
            else
                this._toastr.success('Relprev criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._relprevService.getById(this.id).subscribe(model => {
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
            }
            if (messages.length === 1)
                this._toastr.error(messages[0]);
            else
                this._toastr.error("- " + messages.join("<br>- "));
        }
    }

}
