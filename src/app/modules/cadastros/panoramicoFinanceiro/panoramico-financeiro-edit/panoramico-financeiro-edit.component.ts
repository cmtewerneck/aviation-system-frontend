import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { PanoramicoServico } from '../../panoramicoServico/panoramicoServico.model';
import { Revendedor } from '../../revendedor/revendedor.model';
import { PanoramicoFinanceiroService } from '../panoramicoFinanceiro.service';

@Component({
    selector: 'app-panoramico-financeiro-edit',
    templateUrl: './panoramico-financeiro-edit.component.html',
    styleUrls: ['./panoramico-financeiro-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PanoramicoFinanceiroEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    revendedores: Revendedor[];
    servicos: PanoramicoServico[];
    servicoEscolhido: PanoramicoServico;
    
    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _panoramicoFinanceiroService: PanoramicoFinanceiroService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._panoramicoFinanceiroService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this._panoramicoFinanceiroService.obterRevendedores()
            .subscribe(revendedores => this.revendedores = revendedores);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            data: ['', Validators.required],
            situacao: ['', Validators.required],
            preco: ['', Validators.required],
            aeronaveId: ['', Validators.required],
            revendedorId: ['', Validators.required],
            panoramicoServicoId: ['', Validators.required]
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    ngOnDestroy(): void {}

    cancel() {
        this.close.emit(false);
    }

    aeronaveSelecionada(value: any) {
        this._panoramicoFinanceiroService.obterServicosDaAeronave(value)
            .subscribe(servicos => this.servicos = servicos);
    }

    servicoSelecionado(value: any) {
        this._panoramicoFinanceiroService.obterServicosPorId(value)
            .subscribe(servicoEscolhido => this.mainForm.controls['preco'].setValue(servicoEscolhido.preco));
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        const model = this.mainForm.value;

        const $obs = this.id ? this._panoramicoFinanceiroService.update(model) : this._panoramicoFinanceiroService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Lançamento atualizado com sucesso');
            else
                this._toastr.success('Lançamento criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._panoramicoFinanceiroService.getById(this.id).subscribe(model => {
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
