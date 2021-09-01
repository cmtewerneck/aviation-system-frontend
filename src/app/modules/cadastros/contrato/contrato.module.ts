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
import { ContratoEditComponent } from './contrato-edit/contrato-edit.component';
import { ContratoListComponent } from './contrato-list/contrato-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaskModule } from 'ngx-mask';
import { ContratoModalExcelComponent } from './contrato-modal-excel/contrato-modal-excel.component';
import { ContratoModalPdfComponent } from './contrato-modal-pdf/contrato-modal-pdf.component';

const contratoRoutes: Route[] = [
    {
        path: '',
        component: ContratoListComponent
    }
];

@NgModule({
    declarations: [
        ContratoListComponent,
        ContratoEditComponent,
        ContratoModalExcelComponent,
        ContratoModalPdfComponent
    ],
    imports: [
        RouterModule.forChild(contratoRoutes),
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
        MatTabsModule,
        NgxMaskModule.forChild(),
        SharedModule
    ]
})
export class ContratoModule {
}
