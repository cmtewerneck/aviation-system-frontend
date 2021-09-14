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
import { PassagemAereaEditComponent } from './passagem-aerea-edit/passagem-aerea-edit.component';
import { PassagemAereaListComponent } from './passagem-aerea-list/passagem-aerea-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { PassagemAereaModalPdfComponent } from './passagem-aerea-modal-pdf/passagem-aerea-modal-pdf.component';
import { PassagemAereaModalExcelComponent } from './passagem-aerea-modal-excel/passagem-aerea-modal-excel.component';
import { FuseCardModule } from '@fuse/components/card';
import { PassagemAereaDetailComponent } from './passagem-aerea-detail/passagem-aerea-detail.component';
import { PassagemAereaModalExcluirComponent } from './passagem-aerea-modal-excluir/passagem-aerea-modal-excluir.component';

const passagemAereaRoutes: Route[] = [
    {
        path: '', component: PassagemAereaListComponent
    },
    {
        path: 'details/:id', component: PassagemAereaDetailComponent
    }
];

@NgModule({
    declarations: [
        PassagemAereaListComponent,
        PassagemAereaEditComponent,
        PassagemAereaModalPdfComponent,
        PassagemAereaDetailComponent,
        PassagemAereaModalExcluirComponent,
        PassagemAereaModalExcelComponent
    ],
    imports: [
        RouterModule.forChild(passagemAereaRoutes),
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
        NgxMaskModule.forChild(),
        FuseCardModule,
        SharedModule
    ]
})
export class PassagemAereaModule {
}
