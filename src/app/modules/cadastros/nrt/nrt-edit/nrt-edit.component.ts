import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaTreinamento } from '../../categoriaTreinamento/categoriaTreinamento.model';
import { Tripulante } from '../../tripulante/tripulante.model';
import { NrtService } from '../nrt.service';

@Component({
    selector: 'app-nrt-edit',
    templateUrl: './nrt-edit.component.html',
    styleUrls: ['./nrt-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class NrtEditComponent implements OnInit, OnDestroy {

    get categoriasArray(): FormArray {
        return <FormArray>this.mainForm.get('categorias');
    }

    get tripulantesArray(): FormArray {
        return <FormArray>this.mainForm.get('pessoas');
    }

    isLoading: boolean = false;

    categorias: CategoriaTreinamento[];
    tripulantes: Tripulante[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _nrtService: NrtService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._nrtService.obterTripulantes()
            .subscribe(tripulantes => this.tripulantes = tripulantes);

        this._nrtService.obterCategorias()
            .subscribe(categorias => this.categorias = categorias);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            numero: ['', Validators.required],
            funcao: ['', Validators.required],
            habilitacao: ['', Validators.required],
            tipoTreinamento: ['', Validators.required],
            dataInicio: ['', Validators.required],
            dataTermino: ['', Validators.required],
            validade: ['', Validators.required],
            situacaoTreinamento: ['', Validators.required],
            categorias: this._formBuilder.array([]),
            pessoas: this._formBuilder.array([])
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

    criaCategoria(categoria: any): FormGroup {
        return this._formBuilder.group({
          id: [categoria.id, Validators.required],
          categoriaId: [categoria.categoriaId, Validators.required],
          inicio: [categoria.inicio],
          termino: [categoria.termino],
          instrutor: [categoria.instrutor, Validators.required]
        });
    }

    adicionarTripulante(){
        this.tripulantesArray.push(this.criaTripulante({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    adicionarCategoria(){
        this.categoriasArray.push(this.criaCategoria({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerTripulante(id: number){
        this.tripulantesArray.removeAt(id);
    }

    removerCategoria(id: number){
        this.categoriasArray.removeAt(id);
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

        const $obs = this.id ? this._nrtService.update(model) : this._nrtService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('NRT atualizada com sucesso');
            else
                this._toastr.success('NRT criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._nrtService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.pessoas.forEach(pessoa => {
                this.tripulantesArray.push(this.criaTripulante(pessoa));
            });

            model.categorias.forEach(categoria => {
                this.categoriasArray.push(this.criaCategoria(categoria));
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
