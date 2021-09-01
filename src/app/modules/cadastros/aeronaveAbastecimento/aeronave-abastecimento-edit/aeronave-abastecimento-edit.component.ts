import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { AeronaveAbastecimentoService } from '../aeronaveAbastecimento.service';

@Component({
    selector: 'app-aeronave-abastecimento-edit',
    templateUrl: './aeronave-abastecimento-edit.component.html',
    styleUrls: ['./aeronave-abastecimento-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveAbastecimentoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    
    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _aeronaveAbastecimentoService: AeronaveAbastecimentoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._aeronaveAbastecimentoService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            data: ['', Validators.required],
            litros: ['', Validators.required],
            local: ['', Validators.required],
            cupom: ['', Validators.required],
            notaFiscal: [''],
            fornecedora: ['', Validators.required],
            responsavel: ['', Validators.required],
            valor: [''],
            observacoes: [''],
            comprovante: [''],
            aeronaveId: ['', Validators.required]
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

        const $obs = this.id ? this._aeronaveAbastecimentoService.update(model) : this._aeronaveAbastecimentoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Abastecimento atualizado com sucesso');
            else
                this._toastr.success('Abastecimento criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._aeronaveAbastecimentoService.getById(this.id).subscribe(model => {
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
