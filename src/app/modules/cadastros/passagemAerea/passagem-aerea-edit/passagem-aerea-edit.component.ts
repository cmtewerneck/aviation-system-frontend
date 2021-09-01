import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from '../../diaria/pessoa.model';
import { PassagemAereaService } from '../passagemAerea.service';

@Component({
    selector: 'app-passagem-aerea-edit',
    templateUrl: './passagem-aerea-edit.component.html',
    styleUrls: ['./passagem-aerea-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PassagemAereaEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    pessoas: Pessoa[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _passagemAereaService: PassagemAereaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._passagemAereaService.obterPessoas()
            .subscribe(pessoas => this.pessoas = pessoas);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            dataCompra: ['', Validators.required],
            dataVoo: ['', Validators.required],
            valor: ['', Validators.required],
            empresa: ['', Validators.required],
            origem: ['', Validators.required],
            destino: ['', Validators.required],
            formaPagamento: [''],
            assento: ['', Validators.required],
            localizador: [''],
            link: [''],
            colaboradorId: ['', Validators.required]
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

        const $obs = this.id ? this._passagemAereaService.update(model) : this._passagemAereaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Passagem atualizada com sucesso');
            else
                this._toastr.success('Passagem criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._passagemAereaService.getById(this.id).subscribe(model => {
            model.valor = DecimalUtils.DecimalParaString(model.valor);
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
