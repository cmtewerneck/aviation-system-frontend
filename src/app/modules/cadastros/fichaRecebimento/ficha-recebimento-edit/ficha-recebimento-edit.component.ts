import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { FichaRecebimentoService } from '../fichaRecebimento.service';

@Component({
    selector: 'app-ficha-recebimento-edit',
    templateUrl: './ficha-recebimento-edit.component.html',
    styleUrls: ['./ficha-recebimento-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FichaRecebimentoEditComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    
    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _fichaRecebimentoService: FichaRecebimentoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._fichaRecebimentoService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            dataEntrada: ['', Validators.required],                                     
            local: ['', Validators.required],                                             
            responsavel: [''],                                        
            dataSaida: [''],                                       
            drenos: [''],                        
            comandos: [''],                        
            esquisFlutuadores: [''],               
            janelaParaBrisa: [''],                 
            capotasMotor: [''],                    
            estofamentoCintosSeguranca: [''],      
            pintura: [''],                         
            fiacao: [''],                          
            mangueiraTubulacao: [''],              
            luzesFarois: [''],                     
            radiosInstrumentos: [''],              
            elt: [''],                             
            bateria: [''],                         
            extintores: [''],                      
            kitPrimeirosSocorros: [''],            
            aeronaveId: ['', Validators.required]
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

        const $obs = this.id ? this._fichaRecebimentoService.update(model) : this._fichaRecebimentoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Ficha atualizada com sucesso');
            else
                this._toastr.success('Ficha criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._fichaRecebimentoService.getById(this.id).subscribe(model => {
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

}
