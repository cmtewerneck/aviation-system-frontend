import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from '../../veiculo/veiculo.model';
import { VeiculoGastoService } from '../veiculoGasto.service';

@Component({
    selector: 'app-veiculo-gasto-edit',
    templateUrl: './veiculo-gasto-edit.component.html',
    styleUrls: ['./veiculo-gasto-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoGastoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    veiculos: Veiculo[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _veiculoGastoService: VeiculoGastoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._veiculoGastoService.obterVeiculos()
            .subscribe(veiculos => this.veiculos = veiculos);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            data: ['', Validators.required],
            descricao: ['', Validators.required],
            situacao: ['', Validators.required],
            valor: ['', Validators.required],
            veiculoId: ['', Validators.required]
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

        const $obs = this.id ? this._veiculoGastoService.update(model) : this._veiculoGastoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Gasto atualizado com sucesso');
            else
                this._toastr.success('Gasto criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._veiculoGastoService.getById(this.id).subscribe(model => {
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
