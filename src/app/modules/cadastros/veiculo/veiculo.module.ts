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
import { VeiculoEditComponent } from './veiculo-edit/veiculo-edit.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { VeiculoModalPdfComponent } from './veiculo-modal-pdf/veiculo-modal-pdf.component';
import { VeiculoModalExcelComponent } from './veiculo-modal-excel/veiculo-modal-excel.component';
import { VeiculoModalExcluirComponent } from './veiculo-modal-excluir/veiculo-modal-excluir.component';
import { VeiculoDetailComponent } from './veiculo-detail/veiculo-detail.component';
import { FuseCardModule } from '@fuse/components/card';

const veiculoRoutes: Route[] = [
    {
        path: '', component: VeiculoListComponent
    },
    {
        path: 'details/:id', component: VeiculoDetailComponent
    }
];

@NgModule({
    declarations: [
        VeiculoListComponent,
        VeiculoEditComponent,
        VeiculoModalExcelComponent,
        VeiculoModalPdfComponent,
        VeiculoModalExcluirComponent,
        VeiculoDetailComponent
    ],
    imports: [
        RouterModule.forChild(veiculoRoutes),
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
        SharedModule,
        NgxMaskModule.forChild(),
        FuseCardModule
    ]
})
export class VeiculoModule {
}
