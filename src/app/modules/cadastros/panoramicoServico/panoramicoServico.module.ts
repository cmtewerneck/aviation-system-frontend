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
import { PanoramicoServicoEditComponent } from './panoramico-servico-edit/panoramico-servico-edit.component';
import { PanoramicoServicoListComponent } from './panoramico-servico-list/panoramico-servico-list.component';
import { PanoramicoServicoModalPdfComponent } from './panoramico-servico-modal-pdf/panoramico-servico-modal-pdf.component';
import { PanoramicoServicoModalExcelComponent } from './panoramico-servico-modal-excel/panoramico-servico-modal-excel.component';

const panoramicoServicoRoutes: Route[] = [
    {
        path: '',
        component: PanoramicoServicoListComponent
    }
];

@NgModule({
    declarations: [
        PanoramicoServicoListComponent,
        PanoramicoServicoEditComponent,
        PanoramicoServicoModalExcelComponent,
        PanoramicoServicoModalPdfComponent
    ],
    imports: [
        RouterModule.forChild(panoramicoServicoRoutes),
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
        SharedModule
    ]
})
export class PanoramicoServicoModule {
}
