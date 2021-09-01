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
import { SuprimentoEditComponent } from './suprimento-edit/suprimento-edit.component';
import { SuprimentoListComponent } from './suprimento-list/suprimento-list.component';
import { SuprimentoModalPdfComponent } from './suprimento-modal-pdf/suprimento-modal-pdf.component';
import { SuprimentoModalExcelComponent } from './suprimento-modal-excel/suprimento-modal-excel.component';
import { SuprimentoDetailComponent } from './suprimento-detail/suprimento-detail.component';
import { FuseCardModule } from '@fuse/components/card';

const suprimentoRoutes: Route[] = [
    {
        path: '', component: SuprimentoListComponent
    },
    {
        path: 'details/:id', component: SuprimentoDetailComponent
    }
];

@NgModule({
    declarations: [
        SuprimentoListComponent,
        SuprimentoEditComponent,
        SuprimentoDetailComponent,
        SuprimentoModalPdfComponent,
        SuprimentoModalExcelComponent
    ],
    imports: [
        RouterModule.forChild(suprimentoRoutes),
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
export class SuprimentoModule {
}
