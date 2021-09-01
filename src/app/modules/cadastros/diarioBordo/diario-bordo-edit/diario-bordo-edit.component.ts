import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Aeronave } from '../../aeronave/aeronave.model';
import { Tripulante } from '../../tripulante/tripulante.model';
import { DiarioBordoService } from '../diarioBordo.service';

@Component({
    selector: 'app-diario-bordo-edit',
    templateUrl: './diario-bordo-edit.component.html',
    styleUrls: ['./diario-bordo-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class DiarioBordoEditComponent implements OnInit, OnDestroy {

    get linhasDiariosBordoArray(): FormArray {
        return <FormArray>this.mainForm.get('linhasDiariosBordo');
    }

    isLoading: boolean = false;

    aeronaves: Aeronave[];
    tripulantes: Tripulante[];
    
    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _diarioBordoService: DiarioBordoService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._diarioBordoService.obterAeronaves()
            .subscribe(aeronaves => this.aeronaves = aeronaves);

        this._diarioBordoService.obterTripulantes()
            .subscribe(tripulantes => this.tripulantes = tripulantes);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            data: ['', Validators.required],
            baseContratual: ['', Validators.required],
            numero: ['', Validators.required],
            pagina: ['', Validators.required],
            observacoes: [''],
            discrepancias: [''],
            acoesCorretivas: [''],
            aeronaveId: ['', Validators.required],
            linhasDiariosBordo: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaLinha(linha: any): FormGroup {
        return this._formBuilder.group({
            id: [linha.id, Validators.required],
            de: [linha.de, Validators.required],
            para: [linha.para, Validators.required],
            horaAcionamento: [linha.horaAcionamento, Validators.required],
            horaDecolagem: [linha.horaDecolagem],
            horaPouso: [linha.horaPouso],
            horaCorte: [linha.horaCorte, Validators.required],
            totalDiurno: [linha.totalDiurno],
            totalNoturno: [linha.totalNoturno],
            totalIfr: [linha.totalIfr],
            totalNavegacao: [linha.totalNavegacao],
            totalDecimal: [DecimalUtils.DecimalParaString(linha.totalDecimal), Validators.required],
            totalDecPouso: [DecimalUtils.DecimalParaString(linha.totalDecPouso)],
            totalAcionamentoCorte: [DecimalUtils.DecimalParaString(linha.totalAcionamentoCorte), Validators.required],
            pousos: [linha.pousos, Validators.required],
            pob: [linha.pob, Validators.required],
            combustivelDecolagem: [linha.combustivelDecolagem, Validators.required],
            naturezaVoo: [linha.naturezaVoo, Validators.required],
            preVooResponsavel: [linha.preVooResponsavel, Validators.required],
            posVooResponsavel: [linha.posVooResponsavel, Validators.required],
            comandanteId: [linha.comandanteId, Validators.required],
            copilotoId: [linha.copilotoId],
            mecanicoResponsavelId: [linha.mecanicoResponsavelId]
        });
    }

    adicionarLinha(){
        this.linhasDiariosBordoArray.push(this.criaLinha({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerLinha(id: number){
        this.linhasDiariosBordoArray.removeAt(id);
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
        model.linhasDiariosBordo.forEach(element => {
            let horaAcionamentoConvertida = moment.utc(element.horaAcionamento, 'HH:mm');
            horaAcionamentoConvertida.format('YYYY-MM-DD HH:mm');
            element.horaAcionamento = horaAcionamentoConvertida;

            if (element.horaDecolagem) {
                let horaDecolagemConvertida = moment.utc(element.horaDecolagem, 'HH:mm');
                horaDecolagemConvertida.format('YYYY-MM-DD HH:mm');
                element.horaDecolagem = horaDecolagemConvertida;
            } else {element.horaDecolagem = null}

            if (element.horaPouso) {
                let horaPousoConvertida = moment.utc(element.horaPouso, 'HH:mm');
                horaPousoConvertida.format('YYYY-MM-DD HH:mm');
                element.horaPouso = horaPousoConvertida;
            } else {element.horaPouso = null}

            let horaCorteConvertida = moment.utc(element.horaCorte, 'HH:mm');
            horaCorteConvertida.format('YYYY-MM-DD HH:mm');
            element.horaCorte = horaCorteConvertida;

            if (element.totalDiurno) {
                let totalDiurnoConvertida = moment.utc(element.totalDiurno, 'HH:mm');
                totalDiurnoConvertida.format('YYYY-MM-DD HH:mm');
                element.totalDiurno = totalDiurnoConvertida;
            } else {element.totalDiurno = null}

            if (element.totalNoturno) {
                let totalNoturnoConvertida = moment.utc(element.totalNoturno, 'HH:mm');
                totalNoturnoConvertida.format('YYYY-MM-DD HH:mm');
                element.totalNoturno = totalNoturnoConvertida;
            } else {element.totalNoturno = null}

            if (element.totalIfr) {
                let totalIfrConvertida = moment.utc(element.totalIfr, 'HH:mm');
                totalIfrConvertida.format('YYYY-MM-DD HH:mm');
                element.totalIfr = totalIfrConvertida;
            } else {element.totalIfr = null}

            if (element.totalNavegacao) {
                let totalNavegacaoConvertida = moment.utc(element.totalNavegacao, 'HH:mm');
                totalNavegacaoConvertida.format('YYYY-MM-DD HH:mm');
                element.totalNavegacao = totalNavegacaoConvertida;
            } else {element.totalNavegacao = null}

            if(element.copilotoId == "") {element.copilotoId = null}
            if(element.mecanicoResponsavelId == "") {element.mecanicoResponsavelId = null}
        }); 
        // FIM DAS CONVERSÕES 

        const $obs = this.id ? this._diarioBordoService.update(model) : this._diarioBordoService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Diário de bordo atualizado com sucesso');
            else
                this._toastr.success('Diário de bordo criado com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._diarioBordoService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.linhasDiariosBordo.forEach(linha => {
                this.linhasDiariosBordoArray.push(this.criaLinha(linha));
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
