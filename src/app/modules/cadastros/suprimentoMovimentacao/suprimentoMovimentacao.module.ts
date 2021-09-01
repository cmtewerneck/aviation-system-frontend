import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SuprimentoMovimentacaoEditComponent } from './suprimento-movimentacao-edit/suprimento-movimentacao-edit.component';
import { SuprimentoMovimentacaoListComponent } from './suprimento-movimentacao-list/suprimento-movimentacao-list.component';
import { SuprimentoMovimentacaoModalPdfComponent } from './suprimento-movimentacao-modal-pdf/suprimento-movimentacao-modal-pdf.component';
import { SuprimentoMovimentacaoModalExcelComponent } from './suprimento-movimentacao-modal-excel/suprimento-movimentacao-modal-excel.component';

const suprimentoMovimentacaoRoutes: Route[] = [
    {
        path: '',
        component: SuprimentoMovimentacaoListComponent
    }
];

@NgModule({
    declarations: [
        SuprimentoMovimentacaoListComponent,
        SuprimentoMovimentacaoEditComponent,
        SuprimentoMovimentacaoModalPdfComponent,
        SuprimentoMovimentacaoModalExcelComponent
    ],
    imports: [
        RouterModule.forChild(suprimentoMovimentacaoRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,
        MatExpansionModule,
        SharedModule
    ]
})
export class SuprimentoMovimentacaoModule {
}
