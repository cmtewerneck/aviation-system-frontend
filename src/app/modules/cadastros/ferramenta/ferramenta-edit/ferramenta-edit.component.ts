import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FerramentaService } from '../ferramenta.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

@Component({
    selector: 'app-ferramenta-edit',
    templateUrl: './ferramenta-edit.component.html',
    styleUrls: ['./ferramenta-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FerramentaEditComponent implements OnInit, OnDestroy {

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

        model.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        model.imagem = this.imagemNome;

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
