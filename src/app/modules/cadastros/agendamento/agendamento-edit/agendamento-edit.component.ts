import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { CategoriaVoo } from '../../categoriaVoo/categoriaVoo.model';
import { AgendamentoService } from '../agendamento.service';

@Component({
    selector: 'app-agendamento-edit',
    templateUrl: './agendamento-edit.component.html',
    styleUrls: ['./agendamento-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AgendamentoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    categorias: CategoriaVoo[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _agendamentoService: AgendamentoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._agendamentoService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this._agendamentoService.obterCategorias()
            .subscribe(categorias => this.categorias = categorias);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            title: ['', Validators.required],
            start: ['', Validators.required],
            end: ['', Validators.required],
            allDay: ['', Validators.required],
            editable: [true],
            durationEditable: [true],
            backgroundColor: ['#000000', Validators.required],
            textColor: ['#ffffff', Validators.required],
            aeronaveId: ['', Validators.required],
            categoriaId: ['', Validators.required]
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

        const $obs = this.id ? this._agendamentoService.update(model) : this._agendamentoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Agendamento atualizado com sucesso');
            else
                this._toastr.success('Agendamento criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._agendamentoService.getById(this.id).subscribe(model => {
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
