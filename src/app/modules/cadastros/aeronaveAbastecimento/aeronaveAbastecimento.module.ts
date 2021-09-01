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
import { AeronaveAbastecimentoEditComponent } from './aeronave-abastecimento-edit/aeronave-abastecimento-edit.component';
import { AeronaveAbastecimentoListComponent } from './aeronave-abastecimento-list/aeronave-abastecimento-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { AeronaveAbastecimentoModalPdfComponent } from './aeronave-abastecimento-modal-pdf/aeronave-abastecimento-modal-pdf.component';
import { AeronaveAbastecimentoModalExcelComponent } from './aeronave-abastecimento-modal-excel/aeronave-abastecimento-modal-excel.component';

const aeronaveAbastecimentoRoutes: Route[] = [
    {
        path: '',
        component: AeronaveAbastecimentoListComponent
    }
];

@NgModule({
    declarations: [
        AeronaveAbastecimentoListComponent,
        AeronaveAbastecimentoEditComponent,
        AeronaveAbastecimentoModalPdfComponent,
        AeronaveAbastecimentoModalExcelComponent
    ],
    imports: [
        RouterModule.forChild(aeronaveAbastecimentoRoutes),
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
export class AeronaveAbastecimentoModule {
}
