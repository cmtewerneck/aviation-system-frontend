import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { Tripulante } from '../../tripulante/tripulante.model';
import { ListaPassageiroService } from '../listaPassageiro.service';

@Component({
    selector: 'app-lista-passageiro-edit',
    templateUrl: './lista-passageiro-edit.component.html',
    styleUrls: ['./lista-passageiro-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ListaPassageiroEditComponent implements OnInit, OnDestroy {

    get passageirosArray(): FormArray {
        return <FormArray>this.mainForm.get('passageiros');
    }

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    tripulantes: Tripulante[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _listaPassageiroService: ListaPassageiroService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._listaPassageiroService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this._listaPassageiroService.obterTripulantes()
            .subscribe(tripulantes => this.tripulantes = tripulantes);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            data: ['', Validators.required],
            origem: [''],
            destino: [''],
            aeronaveId: ['', Validators.required],
            comandanteId: ['', Validators.required],
            passageiros: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaPassageiro(passageiro: any): FormGroup {
        return this._formBuilder.group({
          id: [passageiro.id, Validators.required],
          nome: [passageiro.nome, Validators.required],
          documento: [passageiro.documento],
          peso: [passageiro.peso],
          telefone: [passageiro.telefone],
          email: [passageiro.email, Validators.email],
          nomeEmergencia: [passageiro.nomeEmergencia],
          telefoneEmergencia: [passageiro.telefoneEmergencia]
        });
    }

    adicionarPassageiro(){
        this.passageirosArray.push(this.criaPassageiro({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerPassageiro(id: number){
        this.passageirosArray.removeAt(id);
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

        const $obs = this.id ? this._listaPassageiroService.update(model) : this._listaPassageiroService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Lista de passageiro atualizada com sucesso');
            else
                this._toastr.success('Lista de passageiro criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._listaPassageiroService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.passageiros.forEach(passageiro => {
                passageiro.peso = DecimalUtils.DecimalParaString(passageiro.peso);
                this.passageirosArray.push(this.criaPassageiro(passageiro));
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
            }
            if (messages.length === 1)
                this._toastr.error(messages[0]);
            else
                this._toastr.error("- " + messages.join("<br>- "));
        }
    }

}
