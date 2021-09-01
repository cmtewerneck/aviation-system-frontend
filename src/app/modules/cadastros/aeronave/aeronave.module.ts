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
import { MatTabsModule } from '@angular/material/tabs';
import { AeronaveEditComponent } from './aeronave-edit/aeronave-edit.component';
import { AeronaveListComponent } from './aeronave-list/aeronave-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { AeronaveModalExcelComponent } from './aeronave-modal-excel/aeronave-modal-excel.component';
import { AeronaveModalPdfComponent } from './aeronave-modal-pdf/aeronave-modal-pdf.component';

const aeronaveRoutes: Route[] = [
    {
        path: '',
        component: AeronaveListComponent
    }
];

@NgModule({
    declarations: [
        AeronaveListComponent,
        AeronaveEditComponent,
        AeronaveModalExcelComponent,
        AeronaveModalPdfComponent
    ],
    imports: [
        RouterModule.forChild(aeronaveRoutes),
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
export class AeronaveModule {
}
