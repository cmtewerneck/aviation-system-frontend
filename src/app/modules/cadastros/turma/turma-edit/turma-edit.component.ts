import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimalUtils } from 'app/shared/helpers/decimal-utils';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from '../../aluno/aluno.model';
import { Curso } from '../../curso/curso.model';
import { TurmaService } from '../turma.service';

@Component({
    selector: 'app-turma-edit',
    templateUrl: './turma-edit.component.html',
    styleUrls: ['./turma-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TurmaEditComponent implements OnInit, OnDestroy {

    get alunosArray(): FormArray {
        return <FormArray>this.mainForm.get('alunosTurmas');
    }

    isLoading: boolean = false;

    alunos: Aluno[];
    cursos: Curso[];

    mainForm: FormGroup;

    @Input() id: string = null;
    @Output() close = new EventEmitter<Boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _turmaService: TurmaService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {

        this._turmaService.obterPessoas()
            .subscribe(alunos => this.alunos = alunos);

        this._turmaService.obterCursos()
            .subscribe(cursos => this.cursos = cursos);

        this.mainForm = this._formBuilder.group({
            id: [this.id],
            codigo: ['', Validators.required],
            dataInicio: ['', Validators.required],
            dataTermino: [''],
            inscricao: [''],
            mensalidade: [''],
            cursoId: ['', Validators.required],
            alunosTurmas: this._formBuilder.array([])
        });

        if (this.id) // Update
        {
            this.loadEntity();
        }

    }

    criaAluno(aluno: any): FormGroup {
        return this._formBuilder.group({
          alunoId: [aluno.alunoId, Validators.required],
          situacaoAluno: [aluno.situacaoAluno, Validators.required]
        });
    }

    adicionarAluno(){
        this.alunosArray.push(this.criaAluno({ id: "00000000-0000-0000-0000-000000000000" }));
    }

    removerAluno(id: number){
        this.alunosArray.removeAt(id);
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

        const $obs = this.id ? this._turmaService.update(model) : this._turmaService.insert(model);

        this.isLoading = true;
        $obs.subscribe(_ => {
            if (this.id)
                this._toastr.success('Turma atualizada com sucesso');
            else
                this._toastr.success('Turma criada com sucesso');
            this.close.emit(true);
            this.isLoading = false;
        }, error => {
            this.handleError(error);
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._turmaService.getById(this.id).subscribe(model => {
            this.mainForm.patchValue(model);

            model.alunosTurmas.forEach(alunoTurma => {
                this.alunosArray.push(this.criaAluno(alunoTurma));
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
