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
import { VeiculoMultaEditComponent } from './veiculo-multa-edit/veiculo-multa-edit.component';
import { VeiculoMultaListComponent } from './veiculo-multa-list/veiculo-multa-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { VeiculoMultaModalPdfComponent } from './veiculo-multa-modal-pdf/veiculo-multa-modal-pdf.component';
import { VeiculoMultaModalExcelComponent } from './veiculo-multa-modal-excel/veiculo-multa-modal-excel.component';
import { FuseCardModule } from '@fuse/components/card';
import { VeiculoMultaModalExcluirComponent } from './veiculo-multa-modal-excluir/veiculo-multa-modal-excluir.component';
import { VeiculoMultaDetailComponent } from './veiculo-multa-detail/veiculo-multa-detail.component';

const veiculoMultaRoutes: Route[] = [
    {
        path: '',component: VeiculoMultaListComponent
    },
    {
        path: 'details/:id', component: VeiculoMultaDetailComponent
    }
];

@NgModule({
    declarations: [
        VeiculoMultaListComponent,
        VeiculoMultaEditComponent,
        VeiculoMultaModalPdfComponent,
        VeiculoMultaModalExcelComponent,
        VeiculoMultaModalExcluirComponent,
        VeiculoMultaDetailComponent
    ],
    imports: [
        RouterModule.forChild(veiculoMultaRoutes),
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
export class VeiculoMultaModule {
}
