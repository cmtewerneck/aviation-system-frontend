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
import { DiariaEditComponent } from './diaria-edit/diaria-edit.component';
import { DiariaListComponent } from './diaria-list/diaria-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { DiariaModalExcelComponent } from './diaria-modal-excel/diaria-modal-excel.component';
import { DiariaModalPdfComponent } from './diaria-modal-pdf/diaria-modal-pdf.component';

const diariaRoutes: Route[] = [
    {
        path: '',
        component: DiariaListComponent
    }
];

@NgModule({
    declarations: [
        DiariaListComponent,
        DiariaEditComponent,
        DiariaModalPdfComponent,
        DiariaModalExcelComponent
    ],
    imports: [
        RouterModule.forChild(diariaRoutes),
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
        SharedModule
    ]
})
export class DiariaModule {
}
