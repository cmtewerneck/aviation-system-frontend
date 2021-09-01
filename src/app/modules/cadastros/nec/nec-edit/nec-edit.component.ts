import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Sae } from '../../sae/sae.model';
import { Tripulante } from '../../tripulante/tripulante.model';
import { NecService } from '../nec.service';

@Component({
    selector: 'app-nec-edit',
    templateUrl: './nec-edit.component.html',
    styleUrls: ['./nec-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class NecEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    saes: Sae[];
    tripulantes: Tripulante[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _necService: NecService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._necService.obterTripulantes()
            .subscribe(tripulantes => this.tripulantes = tripulantes);

        this._necService.obterSaes()
            .subscribe(saes => this.saes = saes);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            numero: ['', Validators.required],
            funcao: ['', Validators.required],
            equipamento: ['', Validators.required],
            dataExame: ['', Validators.required],
            tipoTreinamento: ['', Validators.required],
            situacaoTreinamento: ['', Validators.required],
            gruDigitos: [''],
            valor: [''],
            pagamentoGru: [''],
            saeId: ['', Validators.required],
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
        // FIM DAS CONVERSÕES

        console.log(model);

        const $obs = this.id ? this._necService.update(model) : this._necService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('NEC atualizada com sucesso');
            else
                this._toastr.success('NEC criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._necService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue({
                id: model.id,
                numero: model.numero,
                funcao: model.funcao,
                equipamento: model.equipamento,
                dataExame: model.dataExame,
                tipoTreinamento: model.tipoTreinamento,
                situacaoTreinamento: model.situacaoTreinamento,
                gruDigitos: model.gruDigitos,
                valor: DecimalUtils.DecimalParaString(model.valor),
                pagamentoGru: model.pagamentoGru,
                saeId: model.saeId,
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
