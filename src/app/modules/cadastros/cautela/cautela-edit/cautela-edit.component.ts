import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ferramenta } from '../../ferramenta/ferramenta.model';
import { CautelaService } from '../cautela.service';

@Component({
    selector: 'app-cautela-edit',
    templateUrl: './cautela-edit.component.html',
    styleUrls: ['./cautela-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CautelaEditComponent implements OnInit, OnDestroy {

    get itensCautelaArray(): FormArray {
        return <FormArray>this.mainForm.get('itensCautela');
    }

    isLoading: boolean = false;

    ferramentas: Ferramenta[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cautelaService: CautelaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._cautelaService.obterFerramentas()
            .subscribe(ferramentas => this.ferramentas = ferramentas);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            dataAbertura: ['', Validators.required],
            responsavel: ['', Validators.required],
            destinatario: ['', Validators.required],
            itensCautela: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaItemCautela(item: any): FormGroup {
        return this._formBuilder.group({
            id: [item.id, Validators.required],
            dataEntrega: [item.dataEntrega, Validators.required],
            dataDevolucao: [item.dataDevolucao],
            quantidade: [item.quantidade, Validators.required],
            status: [item.status, Validators.required],
            ferramentaId: [item.ferramentaId, Validators.required]
        });
    }

    adicionarItemCautela(){
        this.itensCautelaArray.push(this.criaItemCautela({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerItemCautela(id: number){
        this.itensCautelaArray.removeAt(id);
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

        // CONVERSÕES DE JSON (ITEM CAUTELA)
            model.itensCautela.forEach(element => {
                if (element.dataDevolucao) { element.dataDevolucao = new Date(element.dataDevolucao); } else { element.dataDevolucao = null; }
            });
        // FIM DAS CONVERSÕES 

        const $obs = this.id ? this._cautelaService.update(model) : this._cautelaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Cautela atualizada com sucesso');
            else
                this._toastr.success('Cautela criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._cautelaService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue({
                id: model.id, 
                dataAbertura: model.dataAbertura, 
                responsavel: model.responsavel, 
                destinatario: model.destinatario
            });

            model.itensCautela.forEach(item => {
                this.itensCautelaArray.push(this.criaItemCautela(item));
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
