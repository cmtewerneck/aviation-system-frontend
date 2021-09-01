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
import { FornecedorEditComponent } from './fornecedor-edit/fornecedor-edit.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { FornecedorModalExcluirComponent } from './fornecedor-modal-excluir/fornecedor-modal-excluir.component';

const fornecedorRoutes: Route[] = [
    {
        path: '',
        component: FornecedorListComponent
    }
];

@NgModule({
    declarations: [
        FornecedorListComponent,
        FornecedorEditComponent,
        FornecedorModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(fornecedorRoutes),
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
    ]
})
export class FornecedorModule {
}
