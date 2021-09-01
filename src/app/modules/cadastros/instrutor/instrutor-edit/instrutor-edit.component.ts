import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { StringUtils } from 'app/shared/helpers/string-utils';
import { ToastrService } from 'ngx-toastr';
import { InstrutorService } from '../instrutor.service';

@Component({
    selector: 'app-instrutor-edit',
    templateUrl: './instrutor-edit.component.html',
    styleUrls: ['./instrutor-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class InstrutorEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _instrutorService: InstrutorService,
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
            validadeCMA: ['', Validators.required],
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
        model.documento = StringUtils.somenteNumeros(model.documento);
        model.ativo = model.ativo.toString() == "true";
        if (model.dataNascimento) { model.dataNascimento = new Date(model.dataNascimento); } else { model.dataNascimento = null; }
        if (model.dataDemissao) { model.dataDemissao = new Date(model.dataDemissao); } else { model.dataDemissao = null; }
        model.tipoColaborador = 3;
        model.salario = DecimalUtils.StringParaDecimal(model.salario);
        // FIM DAS CONVERSÕES

        const $obs = this.id ? this._instrutorService.update(model) : this._instrutorService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Instrutor atualizado com sucesso');
            else
                this._toastr.success('Instrutor criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._instrutorService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue({
                id: model.id, 
                nome: model.nome, 
                tipoPessoa: model.tipoPessoa, 
                documento: model.documento, 
                sexo: model.sexo, 
                estadoCivil: model.estadoCivil, 
                telefone: model.telefone, 
                email: model.email, 
                dataNascimento: model.dataNascimento, 
                dataAdmissao: model.dataAdmissao, 
                dataDemissao: model.dataDemissao, 
                validadeCMA: model.validadeCMA, 
                tipoColaborador: model.tipoColaborador, 
                canac: model.canac, 
                salario: DecimalUtils.DecimalParaString(model.salario),
                tipoVinculo: model.tipoVinculo, 
                rg: model.rg, 
                orgaoEmissor: model.orgaoEmissor, 
                tituloEleitor: model.tituloEleitor, 
                numeroPis: model.numeroPis, 
                numeroCtps: model.numeroCtps, 
                numeroCnh: model.numeroCnh, 
                imagem: model.imagem, 
                ativo: model.ativo
            });
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
