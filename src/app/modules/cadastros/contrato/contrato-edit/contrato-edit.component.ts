import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { Tripulante } from '../../tripulante/tripulante.model';
import { ContratoService } from '../contrato.service';

@Component({
    selector: 'app-contrato-edit',
    templateUrl: './contrato-edit.component.html',
    styleUrls: ['./contrato-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ContratoEditComponent implements OnInit, OnDestroy {

    get pessoasContratosArray(): FormArray {
        return <FormArray>this.mainForm.get('pessoasContratos');
    }

    get aeronavesContratosArray(): FormArray {
        return <FormArray>this.mainForm.get('aeronavesContratos');
    }

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    tripulantes: Tripulante[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _contratoService: ContratoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._contratoService.obterTripulantes()
            .subscribe(tripulantes => this.tripulantes = tripulantes);

        this._contratoService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            codigo: ['', Validators.required],
            contratante: ['', Validators.required],
            local: [''],
            descricao: ['', Validators.required],
            inicio: [''],
            termino: [''],
            valor: [''],
            ativo: [true, Validators.required],
            arquivo: [''],
            aeronavesContratos: this._formBuilder.array([]),
            pessoasContratos: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaTripulante(tripulante: any): FormGroup {
        return this._formBuilder.group({
          id: [tripulante.id, Validators.required],
          pessoaId: [tripulante.pessoaId, Validators.required]
        });
    }

    criaAeronave(aeronave: any): FormGroup {
        return this._formBuilder.group({
          id: [aeronave.id, Validators.required],
          aeronaveId: [aeronave.aeronaveId, Validators.required]
        });
    }

    adicionarTripulante(){
        this.pessoasContratosArray.push(this.criaTripulante({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    adicionarAeronave(){
        this.aeronavesContratosArray.push(this.criaAeronave({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerTripulante(id: number){
        this.pessoasContratosArray.removeAt(id);
    }

    removerAeronave(id: number){
        this.aeronavesContratosArray.removeAt(id);
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

        const $obs = this.id ? this._contratoService.update(model) : this._contratoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Contrato atualizado com sucesso');
            else
                this._toastr.success('Contrato criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._contratoService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.pessoasContratos.forEach(pessoa => {
                this.pessoasContratosArray.push(this.criaTripulante(pessoa));
            });

            model.aeronavesContratos.forEach(aeronave => {
                this.aeronavesContratosArray.push(this.criaAeronave(aeronave));
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
