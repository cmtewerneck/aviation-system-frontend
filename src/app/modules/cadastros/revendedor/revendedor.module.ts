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
import { RevendedorEditComponent } from './revendedor-edit/revendedor-edit.component';
import { RevendedorListComponent } from './revendedor-list/revendedor-list.component';
import { FuseCardModule } from '@fuse/components/card';
import { RevendedorModalExcluirComponent } from './revendedor-modal-excluir/revendedor-modal-excluir.component';
import { RevendedorDetailComponent } from './revendedor-detail/revendedor-detail.component';

const revendedorRoutes: Route[] = [
    {
        path: '', component: RevendedorListComponent
    },
    {
        path: 'details/:id', component: RevendedorDetailComponent
    }
];

@NgModule({
    declarations: [
        RevendedorListComponent,
        RevendedorEditComponent,
        RevendedorDetailComponent,
        RevendedorModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(revendedorRoutes),
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
export class RevendedorModule {
}
