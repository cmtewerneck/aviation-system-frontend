import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { AeronaveService } from '../aeronave.service';

@Component({
    selector: 'app-aeronave-edit',
    templateUrl: './aeronave-edit.component.html',
    styleUrls: ['./aeronave-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AeronaveEditComponent implements OnInit, OnDestroy {

    get aeronavesDocumentosArray(): FormArray {
        return <FormArray>this.mainForm.get('aeronavesDocumentos');
    }

    get aeronavesMotoresArray(): FormArray {
        return <FormArray>this.mainForm.get('aeronavesMotores');
    }

    get primeirosSocorrosArray(): FormArray {
        return <FormArray>this.mainForm.get('primeirosSocorros');
    }

    get rotoresPrincipaisArray(): FormArray {
        return <FormArray>this.mainForm.get('rotoresPrincipais');
    }

    get rotoresCaudaArray(): FormArray {
        return <FormArray>this.mainForm.get('rotoresCauda');
    }

    isLoading: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _aeronaveService: AeronaveService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            matricula: ['', [Validators.required]],
            fabricante: ['', [Validators.required]],
            categoria: ['', [Validators.required]],
            modelo: ['', [Validators.required]],
            numeroSerie: [''],
            ano: [''],
            pesoVazio: [''],
            pesoBasico: [''],
            horasTotais: ['', [Validators.required]],
            proximaIntervencao: ['', [Validators.required]],
            horasRestantes: [''],
            tipoAeronave: ['', [Validators.required]],
            ultimaPesagem: [''],
            proximaPesagem: [''],
            ativo: [true, [Validators.required]],
            situacao: [true, [Validators.required]],
            imagem: [''],
            aeronavesDocumentos: this._formBuilder.array([]),
            aeronavesMotores: this._formBuilder.array([]),
            primeirosSocorros: this._formBuilder.array([]),
            rotoresPrincipais: this._formBuilder.array([]),
            rotoresCauda: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaDocumento(documento: any): FormGroup {
        return this._formBuilder.group({
          id: [documento.id, Validators.required],
          titulo: [documento.titulo, Validators.required],
          dataEmissao: [documento.dataEmissao],
          dataValidade: [documento.dataValidade, Validators.required],
          arquivo: [documento.arquivo]
        });
    }

    criaMotor(motor: any): FormGroup {
        return this._formBuilder.group({
          id: [motor.id, Validators.required],
          fabricante: [motor.fabricante, Validators.required],
          modelo: [motor.modelo, Validators.required],
          numeroSerie: [motor.numeroSerie, Validators.required],
          horasTotais: [motor.horasTotais],
          ciclosTotais: [motor.ciclosTotais]
        });
    }

    criaPrimeiroSocorro(primeiroSocorro: any): FormGroup {
        return this._formBuilder.group({
          id: [primeiroSocorro.id, Validators.required],
          descricao: [primeiroSocorro.descricao, Validators.required],
          dataCompra: [primeiroSocorro.dataCompra],
          dataValidade: [primeiroSocorro.dataValidade, Validators.required],
          quantidade: [primeiroSocorro.quantidade, Validators.required],
          tipo: [primeiroSocorro.tipo]
        });
    }

    criaRotorPrincipal(rotorPrincipal: any): FormGroup {
        return this._formBuilder.group({
          id: [rotorPrincipal.id, Validators.required],
          partNumber: [rotorPrincipal.partNumber, Validators.required],
          numeroSerie: [rotorPrincipal.numeroSerie],
          horasTotais: [rotorPrincipal.horasTotais],
          ciclosTotais: [rotorPrincipal.ciclosTotais]
        });
    }

    criaRotorCauda(rotorCauda: any): FormGroup {
        return this._formBuilder.group({
          id: [rotorCauda.id, Validators.required],
          partNumber: [rotorCauda.partNumber, Validators.required],
          numeroSerie: [rotorCauda.numeroSerie],
          horasTotais: [rotorCauda.horasTotais],
          ciclosTotais: [rotorCauda.ciclosTotais]
        });
    }
  
    adicionarDocumento(){
        this.aeronavesDocumentosArray.push(this.criaDocumento({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    adicionarMotor(){
        this.aeronavesMotoresArray.push(this.criaMotor({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    adicionarPrimeiroSocorro(){
        this.primeirosSocorrosArray.push(this.criaPrimeiroSocorro({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    adicionarRotorPrincipal(){
        this.rotoresPrincipaisArray.push(this.criaRotorPrincipal({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    adicionarRotorCauda(){
        this.rotoresCaudaArray.push(this.criaRotorCauda({ id: "00000000-0000-0000-0000-000000000000" }));
    }
  
    removerDocumento(id: number){
        this.aeronavesDocumentosArray.removeAt(id);
    }

    removerMotor(id: number){
        this.aeronavesMotoresArray.removeAt(id);
    }

    removerPrimeiroSocorro(id: number){
        this.primeirosSocorrosArray.removeAt(id);
    }

    removerRotorPrincipal(id: number){
        this.rotoresPrincipaisArray.removeAt(id);
    }

    removerRotorCauda(id: number){
        this.rotoresCaudaArray.removeAt(id);
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

        const $obs = this.id ? this._aeronaveService.update(model) : this._aeronaveService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Aeronave atualizada com sucesso');
            else
                this._toastr.success('Aeronave criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._aeronaveService.getById(this.id).subscribe(model => {
            model.pesoBasico = DecimalUtils.DecimalParaString(model.pesoBasico);
            model.pesoVazio = DecimalUtils.DecimalParaString(model.pesoVazio);
            model.horasRestantes = DecimalUtils.DecimalParaString(model.horasRestantes);
            model.horasTotais = DecimalUtils.DecimalParaString(model.horasTotais);
            model.proximaIntervencao = DecimalUtils.DecimalParaString(model.proximaIntervencao);

            this.mainForm.patchValue(model);

            model.aeronavesDocumentos.forEach(documento => {
                this.aeronavesDocumentosArray.push(this.criaDocumento(documento));
            });

            model.aeronavesMotores.forEach(motor => {
                this.aeronavesMotoresArray.push(this.criaMotor(motor));
            });

            model.primeirosSocorros.forEach(primeiroSocorro => {
                this.primeirosSocorrosArray.push(this.criaPrimeiroSocorro(primeiroSocorro));
            });

            model.rotoresPrincipais.forEach(rotorPrincipal => {
                rotorPrincipal.ciclosTotais = DecimalUtils.DecimalParaString(rotorPrincipal.ciclosTotais);
                rotorPrincipal.horasTotais = DecimalUtils.DecimalParaString(rotorPrincipal.horasTotais);

                this.rotoresPrincipaisArray.push(this.criaRotorPrincipal(rotorPrincipal));
            });

            model.rotoresCauda.forEach(rotorCauda => {
                rotorCauda.ciclosTotais = DecimalUtils.DecimalParaString(rotorCauda.ciclosTotais);
                rotorCauda.horasTotais = DecimalUtils.DecimalParaString(rotorCauda.horasTotais);

                this.rotoresCaudaArray.push(this.criaRotorCauda(rotorCauda));
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
