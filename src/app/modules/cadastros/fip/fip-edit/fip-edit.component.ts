import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Curso } from '../../curso/curso.model';
import { FipService } from '../fip.service';

@Component({
    selector: 'app-fip-edit',
    templateUrl: './fip-edit.component.html',
    styleUrls: ['./fip-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FipEditComponent implements OnInit, OnDestroy {

    get itensFipArray(): FormArray {
        return <FormArray>this.mainForm.get('itensFip');
    }

    isLoading: boolean = false;

    cursos: Curso[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _fipService: FipService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._fipService.obterCursos()
            .subscribe(cursos => this.cursos = cursos);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            fase: ['', Validators.required],
            licao: ['', Validators.required],
            tempoPrevisto: ['', Validators.required],
            cursoId: ['', Validators.required],
            itensFip: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaItemFip(item: any): FormGroup {
        return this._formBuilder.group({
        exercicio: [item.exercicio, Validators.required],
        proficienciaAceitavel: [item.proficienciaAceitavel, Validators.required]
        });
    }

    adicionarItemFip(){
        this.itensFipArray.push(this.criaItemFip({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerItemFip(id: number){
        this.itensFipArray.removeAt(id);
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

        
        // CONVERSÕES DE JSON (FIP)
        let dataCompleta = moment.utc(model.tempoPrevisto, 'HH:mm');
        dataCompleta.format('YYYY-MM-DD HH:mm');
        model.tempoPrevisto = dataCompleta;
        // FIM DAS CONVERSÕES 

        const $obs = this.id ? this._fipService.update(model) : this._fipService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('FIP atualizada com sucesso');
            else
                this._toastr.success('FIP criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._fipService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.itensFip.forEach(item => {
                this.itensFipArray.push(this.criaItemFip(item));
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
