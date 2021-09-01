import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { IseService } from '../ise.service';

@Component({
    selector: 'app-ise-edit',
    templateUrl: './ise-edit.component.html',
    styleUrls: ['./ise-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class IseEditComponent implements OnInit, OnDestroy {

    get itensIseArray(): FormArray {
        return <FormArray>this.mainForm.get('itensIse');
    }

    isLoading: boolean = false;

    aeronaves: Aeronave[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _iseService: IseService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._iseService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            dataCriacao: ['', Validators.required],
            dataEnvio: [''],
            responsavel: ['', Validators.required],
            canac: ['', Validators.required],
            itensIse: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaItemIse(item: any): FormGroup {
        return this._formBuilder.group({
        id: [item.id, Validators.required],
        tipoIsencao: [item.tipoIsencao, Validators.required],
        aeronaveId: [item.aeronaveId, Validators.required],
        origem: [item.origem, Validators.required],
        dataHora: [item.dataHora, Validators.required],
        status: [item.status, Validators.required]
        });
    }

    adicionarItemIse(){
        this.itensIseArray.push(this.criaItemIse({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerItemIse(id: number){
        this.itensIseArray.removeAt(id);
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

        const $obs = this.id ? this._iseService.update(model) : this._iseService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('ISE atualizada com sucesso');
            else
                this._toastr.success('ISE criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._iseService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.itensIse.forEach(item => {
                this.itensIseArray.push(this.criaItemIse(item));
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
