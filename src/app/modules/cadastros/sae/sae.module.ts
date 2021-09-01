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
import { SaeEditComponent } from './sae-edit/sae-edit.component';
import { SaeListComponent } from './sae-list/sae-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SaeModalExcelComponent } from './sae-modal-excel/sae-modal-excel.component';
import { SaeModalPdfComponent } from './sae-modal-pdf/sae-modal-pdf.component';

const saeRoutes: Route[] = [
    {
        path: '',
        component: SaeListComponent
    }
];

@NgModule({
    declarations: [
        SaeListComponent,
        SaeEditComponent,
        SaeModalPdfComponent,
        SaeModalExcelComponent
    ],
    imports: [
        RouterModule.forChild(saeRoutes),
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
        SharedModule
    ]
})
export class SaeModule {
}
