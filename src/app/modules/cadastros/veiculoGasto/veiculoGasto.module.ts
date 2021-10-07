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
import { VeiculoGastoEditComponent } from './veiculo-gasto-edit/veiculo-gasto-edit.component';
import { VeiculoGastoListComponent } from './veiculo-gasto-list/veiculo-gasto-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
import { VeiculoGastoModalExcelComponent } from './veiculo-gasto-modal-excel/veiculo-gasto-modal-excel.component';
import { VeiculoGastoModalPdfComponent } from './veiculo-gasto-modal-pdf/veiculo-gasto-modal-pdf.component';
import { FuseCardModule } from '@fuse/components/card';
import { VeiculoGastoModalExcluirComponent } from './veiculo-gasto-modal-excluir/veiculo-gasto-modal-excluir.component';
import { VeiculoGastoDetailComponent } from './veiculo-gasto-detail/veiculo-gasto-detail.component';

const veiculoGastoRoutes: Route[] = [
    {
        path: '', component: VeiculoGastoListComponent
    },
    {
        path: 'details/:id', component: VeiculoGastoDetailComponent
    }
];

@NgModule({
    declarations: [
        VeiculoGastoListComponent,
        VeiculoGastoEditComponent,
        VeiculoGastoModalPdfComponent,
        VeiculoGastoModalExcelComponent,
        VeiculoGastoModalExcluirComponent,
        VeiculoGastoDetailComponent
    ],
    imports: [
        RouterModule.forChild(veiculoGastoRoutes),
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
        NgxCurrencyModule,
        FuseCardModule
    ]
})
export class VeiculoGastoModule {
}
