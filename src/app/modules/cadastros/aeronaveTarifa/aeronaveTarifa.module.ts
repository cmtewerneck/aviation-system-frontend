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
import { AeronaveTarifaEditComponent } from './aeronave-tarifa-edit/aeronave-tarifa-edit.component';
import { AeronaveTarifaListComponent } from './aeronave-tarifa-list/aeronave-tarifa-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { AeronaveTarifaModalExcelComponent } from './aeronave-tarifa-modal-excel/aeronave-tarifa-modal-excel.component';
import { AeronaveTarifaModalPdfComponent } from './aeronave-tarifa-modal-pdf/aeronave-tarifa-modal-pdf.component';
import { FuseCardModule } from '@fuse/components/card';
import { AeronaveTarifaModalExcluirComponent } from './aeronave-tarifa-modal-excluir/aeronave-tarifa-modal-excluir.component';
import { AeronaveTarifaDetailComponent } from './aeronave-tarifa-detail/aeronave-tarifa-detail.component';

const aeronaveTarifaRoutes: Route[] = [
    {
        path: '', component: AeronaveTarifaListComponent
    },
    {
        path: 'details/:id', component: AeronaveTarifaDetailComponent
    }
];

@NgModule({
    declarations: [
        AeronaveTarifaListComponent,
        AeronaveTarifaEditComponent,
        AeronaveTarifaModalPdfComponent,
        AeronaveTarifaModalExcelComponent,
        AeronaveTarifaModalExcluirComponent,
        AeronaveTarifaDetailComponent
    ],
    imports: [
        RouterModule.forChild(aeronaveTarifaRoutes),
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
export class AeronaveTarifaModule {
}
