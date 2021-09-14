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
import { CategoriaVooEditComponent } from './categoria-voo-edit/categoria-voo-edit.component';
import { CategoriaVooListComponent } from './categoria-voo-list/categoria-voo-list.component';
import { CategoriaVooModalExcluirComponent } from './categoria-voo-modal-excluir/categoria-voo-modal-excluir.component';
import { CategoriaVooDetailComponent } from './categoria-voo-detail/categoria-voo-detail.component';
import { FuseCardModule } from '@fuse/components/card';

const categoriaVooRoutes: Route[] = [
    {
        path: '', component: CategoriaVooListComponent
    },
    {
        path: 'details/:id', component: CategoriaVooDetailComponent
    }
];

@NgModule({
    declarations: [
        CategoriaVooListComponent,
        CategoriaVooEditComponent,
        CategoriaVooDetailComponent,
        CategoriaVooModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(categoriaVooRoutes),
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
export class CategoriaVooModule {
}
