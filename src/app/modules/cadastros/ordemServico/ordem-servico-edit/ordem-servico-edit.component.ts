import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { Servico } from '../../servico/servico.model';
import { OrdemServicoService } from '../ordemServico.service';

@Component({
    selector: 'app-ordem-servico-edit',
    templateUrl: './ordem-servico-edit.component.html',
    styleUrls: ['./ordem-servico-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class OrdemServicoEditComponent implements OnInit, OnDestroy {

    get itensArray(): FormArray {
        return <FormArray>this.mainForm.get('itens');
    }

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    servicos: Servico[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _ordemServicoService: OrdemServicoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._ordemServicoService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this._ordemServicoService.obterServicos()
            .subscribe(servicos => this.servicos = servicos);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            numeroOrdem: ['', Validators.required],
            tipo: [''],
            ttsn: [''],
            tcsnPousos: [''],
            dataAbertura: ['', Validators.required],
            ttsnMotor: [''],
            tcsnCiclos: [''],
            dataFechamento: [''],
            requisicaoMateriais: [''],
            realizadoPor: [''],
            realizadoPorAnac: [''],
            dataRealizacao: [''],
            inspecionadoPor: [''],
            inspecionadoPorAnac: [''],
            dataInspecao: [''],
            aeronaveId: [''],
            itens: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaServico(servico: any): FormGroup {
        return this._formBuilder.group({
          id: [servico.id, Validators.required],
          servicoId: [servico.servicoId, Validators.required],
          //custo: [''],
          status: [servico.status, Validators.required]
        });
    }

    adicionarServico(){
        this.itensArray.push(this.criaServico({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerServico(id: number){
        this.itensArray.removeAt(id);
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

        const $obs = this.id ? this._ordemServicoService.update(model) : this._ordemServicoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Ordem de Serviço atualizada com sucesso');
            else
                this._toastr.success('Ordem de Serviço criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._ordemServicoService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.itens.forEach(item => {
                this.itensArray.push(this.criaServico(item));
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
