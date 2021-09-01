import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Contrato } from '../../contrato/contrato.model';
import { DiariaService } from '../diaria.service';
import { Pessoa } from '../pessoa.model';

@Component({
    selector: 'app-diaria-edit',
    templateUrl: './diaria-edit.component.html',
    styleUrls: ['./diaria-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class DiariaEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    pessoas: Pessoa[];
    contratos: Contrato[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _diariaService: DiariaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._diariaService.obterPessoas()
            .subscribe(pessoas => this.pessoas = pessoas);

        this._diariaService.obterContratos()
            .subscribe(contratos => this.contratos = contratos);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            data: ['', Validators.required],
            valor: ['', Validators.required],
            finalidade: ['', Validators.required],
            status: ['', Validators.required],
            formaPagamento: [''],
            colaboradorId: ['', Validators.required],
            contratoId: ['']
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

        const $obs = this.id ? this._diariaService.update(model) : this._diariaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Diária atualizada com sucesso');
            else
                this._toastr.success('Diária criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._diariaService.getById(this.id).subscribe(model => {
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
            }
            if (messages.length === 1)
                this._toastr.error(messages[0]);
            else
                this._toastr.error("- " + messages.join("<br>- "));
        }
    }

}
