import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MesesEnumPipe } from './helpers/mesesEnum.pipe';
import { AtivoBooleanPipe } from './helpers/ativoBoolean.pipe';
import { FormaPagamentoEnumPipe } from './helpers/formaPagamentoEnum.pipe';
import { StatusPagamentoBooleanPipe } from './helpers/statusPagamentoBoolean.pipe';
import { StatusPagamentoEnumPipe } from './helpers/statusPagamentoEnum.pipe';
import { StatusTreinamentoEnumPipe } from './helpers/statusTreinamentoEnum.pipe';
import { TipoCombustivelEnumPipe } from './helpers/tipoCombustivelEnum.pipe';
import { TipoMovimentacaoEnumPipe } from './helpers/tipoMovimentacaoEnum.pipe';
import { TipoTreinamentoEnumPipe } from './helpers/tipoTreinamentoEnum.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        AtivoBooleanPipe,
        FormaPagamentoEnumPipe,
        MesesEnumPipe,
        StatusPagamentoBooleanPipe,
        StatusPagamentoEnumPipe,
        StatusTreinamentoEnumPipe,
        TipoCombustivelEnumPipe,
        TipoMovimentacaoEnumPipe,
        TipoTreinamentoEnumPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AtivoBooleanPipe,
        FormaPagamentoEnumPipe,
        MesesEnumPipe,
        StatusPagamentoBooleanPipe,
        StatusPagamentoEnumPipe,
        StatusTreinamentoEnumPipe,
        TipoCombustivelEnumPipe,
        TipoMovimentacaoEnumPipe,
        TipoTreinamentoEnumPipe,
        MatDialogModule,
        MatCardModule
    ]
}) 
export class SharedModule
{
}
