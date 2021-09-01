import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Nrt } from '../../nrt/nrt.model';
import { SaeService } from '../sae.service';

@Component({
    selector: 'app-sae-edit',
    templateUrl: './sae-edit.component.html',
    styleUrls: ['./sae-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SaeEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    nrts: Nrt[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _saeService: SaeService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._saeService.obterNrts()
            .subscribe(nrts => this.nrts = nrts);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            numero: ['', Validators.required],
            piloto: ['', Validators.required],
            funcao: ['', Validators.required],
            examinador: [false, Validators.required],
            examinadorCanac: [''],
            examinadorNome: [''],
            localizacao: ['', Validators.required],
            equipamento: ['', Validators.required],
            dataExame: ['', Validators.required],
            pais: ['', Validators.required],
            cidade: ['', Validators.required],
            situacaoTreinamento: ['', Validators.required],
            gruDigitos: [''],
            valor: [''],
            pagamentoGru: [''],
            nrtId: ['', Validators.required]
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

        // CONVERSÕES DE JSON
        if (model.valor) { model.valor = DecimalUtils.StringParaDecimal(model.valor); } else { model.valor = null; }
        if (model.pagamentoGru) { model.pagamentoGru = new Date(model.pagamentoGru); } else { model.pagamentoGru = null; }
        model.examinador = model.examinador.toString() == "true";
        // FIM DAS CONVERSÕES

        console.log(model);

        const $obs = this.id ? this._saeService.update(model) : this._saeService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('SAE atualizada com sucesso');
            else
                this._toastr.success('SAE criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._saeService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue({
                id: model.id,
                numero: model.numero,
                piloto: model.piloto,
                funcao: model.funcao,
                examinador: model.examinador,
                examinadorCanac: model.examinadorCanac,
                examinadorNome: model.examinadorNome,
                localizacao: model.localizacao,
                equipamento: model.equipamento,
                dataExame: model.dataExame,
                pais: model.pais,
                cidade: model.cidade,
                situacaoTreinamento: model.situacaoTreinamento,
                gruDigitos: model.gruDigitos,
                valor: DecimalUtils.DecimalParaString(model.valor),
                pagamentoGru: model.pagamentoGru,
                nrtId: model.nrtId        
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
