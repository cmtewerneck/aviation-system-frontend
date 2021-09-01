import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { PanoramicoServicoService } from '../panoramicoServico.service';

@Component({
    selector: 'app-panoramico-servico-edit',
    templateUrl: './panoramico-servico-edit.component.html',
    styleUrls: ['./panoramico-servico-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoServicoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    
    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _panoramicoServicoService: PanoramicoServicoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._panoramicoServicoService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            duracao: ['', Validators.required],
            preco: ['', Validators.required],
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

        // CONVERSÕES PARA JSON
        model.preco = DecimalUtils.StringParaDecimal(model.preco);
        // FIM DAS CONVERSÕES

        const $obs = this.id ? this._panoramicoServicoService.update(model) : this._panoramicoServicoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Serviço atualizado com sucesso');
            else
                this._toastr.success('Serviço criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._panoramicoServicoService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue({
                id: model.id,
                duracao: model.duracao,
                preco: DecimalUtils.DecimalParaString(model.preco),
                aeronaveId: model.aeronaveId
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
