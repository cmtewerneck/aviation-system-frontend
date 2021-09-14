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
import { ManualEmpresaEditComponent } from './manual-empresa-edit/manual-empresa-edit.component';
import { ManualEmpresaListComponent } from './manual-empresa-list/manual-empresa-list.component';
import { FuseCardModule } from '@fuse/components/card';
import { ManualEmpresaDetailComponent } from './manual-empresa-voo-detail/manual-empresa-detail.component';
import { ManualEmpresaModalExcluirComponent } from './manual-empresa-modal-excluir/manual-empresa-modal-excluir.component';

const manualEmpresaRoutes: Route[] = [
    {
        path: '', component: ManualEmpresaListComponent
    },
    {
        path: 'details/:id', component: ManualEmpresaDetailComponent
    }
];

@NgModule({
    declarations: [
        ManualEmpresaListComponent,
        ManualEmpresaEditComponent,
        ManualEmpresaDetailComponent,
        ManualEmpresaModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(manualEmpresaRoutes),
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
        FuseCardModule,
        SharedModule
    ]
})
export class ManualEmpresaModule {
}
