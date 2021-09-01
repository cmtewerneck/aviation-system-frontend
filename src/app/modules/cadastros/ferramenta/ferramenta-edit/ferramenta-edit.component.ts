import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringUtils } from 'app/shared/helpers/string-utils';
import { ToastrService } from 'ngx-toastr';
import { FerramentaService } from '../ferramenta.service';

@Component({
    selector: 'app-ferramenta-edit',
    templateUrl: './ferramenta-edit.component.html',
    styleUrls: ['./ferramenta-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FerramentaEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _ferramentaService: FerramentaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            partNumber: ['', Validators.required],
            nomenclatura: ['', Validators.required],
            quantidade: [0, Validators.required],
            aferivel: [false],
            ultimaAfericao: [''],
            proximaAfericao: [''],
            imagem: [''],
            localizacao: ['']
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

        console.log(model);

        // CONVERSÕES PARA JSON
        model.aferivel = model.aferivel.toString() == "true";
        if (model.ultimaAfericao) { model.ultimaAfericao = new Date(model.ultimaAfericao); } else { model.ultimaAfericao = null; }
        if (model.proximaAfericao) { model.proximaAfericao = new Date(model.proximaAfericao); } else { model.proximaAfericao = null; }
        // FIM DAS CONVERSÕES

        console.log(model);

        const $obs = this.id ? this._ferramentaService.update(model) : this._ferramentaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Ferramenta atualizada com sucesso');
            else
                this._toastr.success('Ferramenta criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._ferramentaService.getById(this.id).subscribe(model => {
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
