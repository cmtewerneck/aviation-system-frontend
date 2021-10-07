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
import { PanoramicoFinanceiroEditComponent } from './panoramico-financeiro-edit/panoramico-financeiro-edit.component';
import { PanoramicoFinanceiroListComponent } from './panoramico-financeiro-list/panoramico-financeiro-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { PanoramicoFinanceiroModalExcelComponent } from './panoramico-financeiro-modal-excel/panoramico-financeiro-modal-excel.component';
import { PanoramicoFinanceiroModalPdfComponent } from './panoramico-financeiro-modal-pdf/panoramico-financeiro-modal-pdf.component';
import { FuseCardModule } from '@fuse/components/card';
import { PanoramicoFinanceiroDetailComponent } from './panoramico-financeiro-detail/panoramico-financeiro-detail.component';
import { PanoramicoFinanceiroModalExcluirComponent } from './panoramico-financeiro-modal-excluir/panoramico-financeiro-modal-excluir.component';

const panoramicoFinanceiroRoutes: Route[] = [
    {
        path: '', component: PanoramicoFinanceiroListComponent
    },
    {
        path: 'details/:id', component: PanoramicoFinanceiroDetailComponent
    }
];

@NgModule({
    declarations: [
        PanoramicoFinanceiroListComponent,
        PanoramicoFinanceiroEditComponent,
        PanoramicoFinanceiroModalPdfComponent,
        PanoramicoFinanceiroModalExcelComponent,
        PanoramicoFinanceiroDetailComponent,
        PanoramicoFinanceiroModalExcluirComponent,
    ],
    imports: [
        RouterModule.forChild(panoramicoFinanceiroRoutes),
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
export class PanoramicoFinanceiroModule {
}
