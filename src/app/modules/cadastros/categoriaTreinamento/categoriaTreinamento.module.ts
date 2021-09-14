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
import { CategoriaTreinamentoEditComponent } from './categoria-treinamento-edit/categoria-treinamento-edit.component';
import { CategoriaTreinamentoListComponent } from './categoria-treinamento-list/categoria-treinamento-list.component';
import { CategoriaTreinamentoModalPdfComponent } from './categoria-treinamento-modal-pdf/categoria-treinamento-modal-pdf.component';
import { CategoriaTreinamentoModalExcelComponent } from './categoria-treinamento-modal-excel/categoria-treinamento-modal-excel.component';
import { CategoriaTreinamentoDetailComponent } from './categoria-treinamento-detail/categoria-treinamento-detail.component';
import { FuseCardModule } from '@fuse/components/card';
import { CategoriaTreinamentoModalExcluirComponent } from './categoria-treinamento-modal-excluir/categoria-treinamento-modal-excluir.component';

const categoriaTreinamentoRoutes: Route[] = [
    {
        path: '', component: CategoriaTreinamentoListComponent
    },
    {
        path: 'details/:id', component: CategoriaTreinamentoDetailComponent
    }
];

@NgModule({
    declarations: [
        CategoriaTreinamentoListComponent,
        CategoriaTreinamentoEditComponent,
        CategoriaTreinamentoModalPdfComponent,
        CategoriaTreinamentoDetailComponent,
        CategoriaTreinamentoModalExcluirComponent,
        CategoriaTreinamentoModalExcelComponent
    ],
    imports: [
        RouterModule.forChild(categoriaTreinamentoRoutes),
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
        FuseCardModule,
        SharedModule
    ]
})
export class CategoriaTreinamentoModule {
}
