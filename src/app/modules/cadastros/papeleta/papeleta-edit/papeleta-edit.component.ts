import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Tripulante } from '../../tripulante/tripulante.model';
import { PapeletaService } from '../papeleta.service';

@Component({
    selector: 'app-papeleta-edit',
    templateUrl: './papeleta-edit.component.html',
    styleUrls: ['./papeleta-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PapeletaEditComponent implements OnInit, OnDestroy {

    get itensPapeletaArray(): FormArray {
        return <FormArray>this.mainForm.get('itensPapeleta');
    }

    isLoading: boolean = false;

    tripulantes: Tripulante[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _papeletaService: PapeletaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._papeletaService.obterTripulantes()
            .subscribe(tripulantes => this.tripulantes = tripulantes);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            mes: ['', Validators.required],
            ano: ['', Validators.required],
            tripulanteId: ['', Validators.required],
            itensPapeleta: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaItemPapeleta(item: any): FormGroup {
        return this._formBuilder.group({
            dia: [item.dia, Validators.required],
            inicioJornada: [item.inicioJornada],
            calcosFora: [item.calcosFora],
            calcosChegada: [item.calcosChegada],
            inicioAlmoco: [item.inicioAlmoco],
            terminoAlmoco: [item.terminoAlmoco],
            inicioInterrupcaoProgramada: [item.inicioInterrupcaoProgramada],
            terminoInterrupcaoProgramada: [item.terminoInterrupcaoProgramada],
            terminoJornada: [item.terminoJornada],
            situacao: [item.situacao, Validators.required]
        });
    }

    adicionarItemPapeleta(){
        this.itensPapeletaArray.push(this.criaItemPapeleta({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerItemPapeleta(id: number){
        this.itensPapeletaArray.removeAt(id);
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

        // CONVERSÕES DE JSON (LINHAS DIARIOS BORDO)
        model.itensPapeleta.forEach(element => {
            if (element.inicioJornada) {
                let horaInicioJornada = element.inicioJornada.toString().split(':')[0];
                let minutoInicioJornada = element.inicioJornada.toString().split(':')[1];
                let inicioJornadaDataCompleta = new Date();
                inicioJornadaDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                inicioJornadaDataCompleta.setUTCHours(horaInicioJornada, minutoInicioJornada);
                element.inicioJornada = moment.utc(inicioJornadaDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.inicioJornada = this.configurarData(element.inicioJornada, element.dia, model.mes, model.ano);
            } else {element.inicioJornada = null}

            if (element.calcosFora) {
                let horacalcosFora = element.calcosFora.toString().split(':')[0];
                let minutocalcosFora = element.calcosFora.toString().split(':')[1];
                let calcosForaDataCompleta = new Date();
                calcosForaDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                calcosForaDataCompleta.setUTCHours(horacalcosFora, minutocalcosFora);
                element.calcosFora = moment.utc(calcosForaDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.calcosFora = this.configurarData(element.calcosFora, element.dia, model.mes, model.ano);
            } else {element.calcosFora = null}

            if (element.calcosChegada) {
                let horacalcosChegada = element.calcosChegada.toString().split(':')[0];
                let minutocalcosChegada = element.calcosChegada.toString().split(':')[1];
                let calcosChegadaDataCompleta = new Date();
                calcosChegadaDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                calcosChegadaDataCompleta.setUTCHours(horacalcosChegada, minutocalcosChegada);
                element.calcosChegada = moment.utc(calcosChegadaDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.calcosChegada = this.configurarData(element.calcosChegada, element.dia, model.mes, model.ano);
            } else {element.calcosChegada = null}

            if (element.inicioAlmoco) {
                let horainicioAlmoco = element.inicioAlmoco.toString().split(':')[0];
                let minutoinicioAlmoco = element.inicioAlmoco.toString().split(':')[1];
                let inicioAlmocoDataCompleta = new Date();
                inicioAlmocoDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                inicioAlmocoDataCompleta.setUTCHours(horainicioAlmoco, minutoinicioAlmoco);
                element.inicioAlmoco = moment.utc(inicioAlmocoDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.inicioAlmoco = this.configurarData(element.inicioAlmoco, element.dia, model.mes, model.ano);
            } else {element.inicioAlmoco = null}

            if (element.terminoAlmoco) {
                let horaterminoAlmoco = element.terminoAlmoco.toString().split(':')[0];
                let minutoterminoAlmoco = element.terminoAlmoco.toString().split(':')[1];
                let terminoAlmocoDataCompleta = new Date();
                terminoAlmocoDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                terminoAlmocoDataCompleta.setUTCHours(horaterminoAlmoco, minutoterminoAlmoco);
                element.terminoAlmoco = moment.utc(terminoAlmocoDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.terminoAlmoco = this.configurarData(element.terminoAlmoco, element.dia, model.mes, model.ano);
            } else {element.terminoAlmoco = null}

            if (element.inicioInterrupcaoProgramada) {
                let horainicioInterrupcaoProgramada = element.inicioInterrupcaoProgramada.toString().split(':')[0];
                let minutoinicioInterrupcaoProgramada = element.inicioInterrupcaoProgramada.toString().split(':')[1];
                let inicioInterrupcaoProgramadaDataCompleta = new Date();
                inicioInterrupcaoProgramadaDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                inicioInterrupcaoProgramadaDataCompleta.setUTCHours(horainicioInterrupcaoProgramada, minutoinicioInterrupcaoProgramada);
                element.inicioInterrupcaoProgramada = moment.utc(inicioInterrupcaoProgramadaDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.inicioInterrupcaoProgramada = this.configurarData(element.inicioInterrupcaoProgramada, element.dia, model.mes, model.ano);
            } else {element.inicioInterrupcaoProgramada = null}

            if (element.terminoInterrupcaoProgramada) {
                let horaterminoInterrupcaoProgramada = element.terminoInterrupcaoProgramada.toString().split(':')[0];
                let minutoterminoInterrupcaoProgramada = element.terminoInterrupcaoProgramada.toString().split(':')[1];
                let terminorogramadaDataCompleta = new Date();
                terminorogramadaDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                terminorogramadaDataCompleta.setUTCHours(horaterminoInterrupcaoProgramada, minutoterminoInterrupcaoProgramada);
                element.terminoInterrupcaoProgramada = moment.utc(terminorogramadaDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.terminoInterrupcaoProgramada = this.configurarData(element.terminoInterrupcaoProgramada, element.dia, model.mes, model.ano);
            } else {element.terminoInterrupcaoProgramada = null}

            if (element.terminoJornada) {
                let horaterminoJornada = element.terminoJornada.toString().split(':')[0];
                let minutoterminoJornada = element.terminoJornada.toString().split(':')[1];
                let terminorogramadaDataCompleta = new Date();
                terminorogramadaDataCompleta.setFullYear(model.ano, model.mes - 1, element.dia);
                terminorogramadaDataCompleta.setUTCHours(horaterminoJornada, minutoterminoJornada);
                element.terminoJornada = moment.utc(terminorogramadaDataCompleta).format('YYYY-MM-DD HH:mm');

                //element.terminoJornada = this.configurarData(element.terminoJornada, element.dia, model.mes, model.ano);
            } else {element.terminoJornada = null}
        }); 
        // FIM DAS CONVERSÕES

        console.log(model);
        
        const $obs = this.id ? this._papeletaService.update(model) : this._papeletaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Papeleta atualizada com sucesso');
            else
                this._toastr.success('Papeleta criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._papeletaService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.itensPapeleta.forEach(item => {
                this.itensPapeletaArray.push(this.criaItemPapeleta(item));
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
            }
            if (messages.length === 1)
                this._toastr.error(messages[0]);
            else
                this._toastr.error("- " + messages.join("<br>- "));
        }
    }

    // configurarData(dataHora: Date, dia: number, mes: number, ano: number) : string {
    //     let horas = dataHora.toString().split(':')[0];
    //     let minutos = dataHora.toString().split(':')[1];

    //     let horasNumber = Number(horas);
    //     let minutosNumber = Number(minutos);

    //     let data = new Date();

    //     data.setFullYear(ano, mes - 1, dia);
    //     data.setUTCHours(horasNumber, minutosNumber);
        
    //     let dataConvertida = moment.utc(data).format('YYYY-MM-DD HH:mm');

    //     return dataConvertida;
    // }

}
