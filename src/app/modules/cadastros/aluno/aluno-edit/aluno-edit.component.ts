import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringUtils } from 'app/shared/helpers/string-utils';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../aluno.service';

@Component({
    selector: 'app-aluno-edit',
    templateUrl: './aluno-edit.component.html',
    styleUrls: ['./aluno-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AlunoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _alunoService: AlunoService,
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
            email: ['', Validators.email],
            dataNascimento: [''],
            validadeCMA: [''],
            tipoColaborador: [''],
            canac: [''],
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
            model.tipoColaborador = 1;
        // FIM DAS CONVERSÕES

        const $obs = this.id ? this._alunoService.update(model) : this._alunoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Aluno atualizado com sucesso');
            else
                this._toastr.success('Aluno criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._alunoService.getById(this.id).subscribe(model => {
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
