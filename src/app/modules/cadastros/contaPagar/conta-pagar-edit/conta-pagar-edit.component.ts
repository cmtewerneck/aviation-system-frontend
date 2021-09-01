import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Contrato } from '../../contrato/contrato.model';
import { ContaPagarService } from '../contaPagar.service';

@Component({
    selector: 'app-conta-pagar-edit',
    templateUrl: './conta-pagar-edit.component.html',
    styleUrls: ['./conta-pagar-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ContaPagarEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    mainForm: FormGroup;

    contratos: Contrato[];

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _contaPagarService: ContaPagarService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._contaPagarService.obterContratos()
            .subscribe(contratos => this.contratos = contratos);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            tipoFinanceiro: [''],
            descricao: ['', Validators.required],
            dataVencimento: [''],
            codigoBarras: [''],
            valorPagar: ['', Validators.required],
            valorPago: [''],
            dataPagamento: [''],
            formaPagamento: [''],
            situacao: [false, Validators.required],
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
        console.log(model);

        // CONVERSÕES PARA JSON
            model.tipoFinanceiro = 2;
        // FIM DAS CONVERSÕES

        console.log(model);

        const $obs = this.id ? this._contaPagarService.update(model) : this._contaPagarService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Conta atualizada com sucesso');
            else
                this._toastr.success('Conta criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._contaPagarService.getById(this.id).subscribe(model => {
            model.valorPagar = DecimalUtils.DecimalParaString(model.valorPagar);
            model.valorPago = DecimalUtils.DecimalParaString(model.valorPago);
           
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
