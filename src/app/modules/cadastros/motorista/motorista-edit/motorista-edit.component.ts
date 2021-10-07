import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { MotoristaService } from '../motorista.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

@Component({
    selector: 'app-motorista-edit',
    templateUrl: './motorista-edit.component.html',
    styleUrls: ['./motorista-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MotoristaEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;
    mainForm: FormGroup;

    // VARIÁVEIS PARA IMAGEM
    imageChangedEvent: any = '';
    containWithinAspectRatio = false;
    canvasRotation = 0;
    transform: ImageTransform = {};
    showCropper = false;
    croppedImage: any = '';
    
    imagemNome: string;
    rotation = 0;
    scale = 1;
    // ----------------------------------

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _motoristaService: MotoristaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            nome: ['', Validators.required],
            tipoPessoa: ['', Validators.required],
            documento: ['', Validators.required],
            sexo: [''],
            estadoCivil: [''],
            telefone: [''],
            email: [''],
            dataNascimento: [''],
            dataAdmissao: ['', Validators.required],
            dataDemissao: [''],
            tipoColaborador: [''],
            canac: ['', Validators.required],
            salario: [''],
            tipoVinculo: ['', Validators.required],
            rg: ['', Validators.required],
            orgaoEmissor: [''],
            tituloEleitor: [''],
            numeroPis: [''],
            numeroCtps: [''],
            numeroCnh: [''],
            imagem: [''],
            ativo: [true, Validators.required]
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

        // CONVERSÕES PARA JSON
            model.tipoColaborador = 4;
            model.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
            model.imagem = this.imagemNome;
        // FIM DAS CONVERSÕES

        const $obs = this.id ? this._motoristaService.update(model) : this._motoristaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Motorista atualizado com sucesso');
            else
                this._toastr.success('Motorista criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._motoristaService.getById(this.id).subscribe(model => {
            model.salario = DecimalUtils.DecimalParaString(model.salario);

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
            }
            if (messages.length === 1)
                this._toastr.error(messages[0]);
            else
                this._toastr.error("- " + messages.join("<br>- "));
        }
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.imagemNome = event.currentTarget.files[0].name;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
      
    imageLoaded() {
        this.showCropper = true;
    }
    
    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Recorte realizado', sourceImageDimensions);
    }
    
    loadImageFailed() {
        console.log('Formato não aceito');
    }

}
