import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { StringUtils } from 'app/shared/helpers/string-utils';
import { ToastrService } from 'ngx-toastr';
import { MecanicoService } from '../mecanico.service';

@Component({
    selector: 'app-mecanico-edit',
    templateUrl: './mecanico-edit.component.html',
    styleUrls: ['./mecanico-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MecanicoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _mecanicoService: MecanicoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            nome: ['', Validators.required],
            tipoPessoa: ['', Validators.required],
            documento: ['', Validators.required],
            sexo: [''],
            estadoCivil: [''],
            telefone: [''],
            email: [''],
            dataNascimento: [''],
            dataAdmissao: ['', Validators.required],
            dataDemissao: [''],
            tipoColaborador: [''],
            canac: ['', Validators.required],
            salario: [''],
            tipoVinculo: ['', Validators.required],
            rg: ['', Validators.required],
            orgaoEmissor: [''],
            tituloEleitor: [''],
            numeroPis: [''],
            numeroCtps: [''],
            numeroCnh: [''],
            imagem: [''],
            ativo: [true, Validators.required]
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
            model.tipoColaborador = 4;
        // FIM DAS CONVERSÕES

        const $obs = this.id ? this._mecanicoService.update(model) : this._mecanicoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Mecânico atualizado com sucesso');
            else
                this._toastr.success('Mecânico criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._mecanicoService.getById(this.id).subscribe(model => {
            model.salario = DecimalUtils.DecimalParaString(model.salario);

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
