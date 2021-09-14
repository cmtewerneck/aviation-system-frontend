import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { MaterialOperacionalService } from '../materialOperacional.service';

@Component({
    selector: 'app-material-operacional-edit',
    templateUrl: './material-operacional-edit.component.html',
    styleUrls: ['./material-operacional-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class MaterialOperacionalEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

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

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _materialOperacionalService: MaterialOperacionalService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            partNumber: ['', Validators.required],
            serialNumber: [''],
            descricao: ['', Validators.required],
            modeloAeronave: [''],
            localizacao: [''],
            quantidade: ['', Validators.required],
            imagem: ['']
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

        model.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        model.imagem = this.imagemNome;

        const $obs = this.id ? this._materialOperacionalService.update(model) : this._materialOperacionalService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Material atualizado com sucesso');
            else
                this._toastr.success('Material criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._materialOperacionalService.getById(this.id).subscribe(model => {
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
