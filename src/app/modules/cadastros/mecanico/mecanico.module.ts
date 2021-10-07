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
import { MecanicoEditComponent } from './mecanico-edit/mecanico-edit.component';
import { MecanicoListComponent } from './mecanico-list/mecanico-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { FuseCardModule } from '@fuse/components/card';
import { MecanicoDetailComponent } from './mecanico-detail/mecanico-detail.component';
import { MecanicoModalExcluirComponent } from './mecanico-modal-excluir/mecanico-modal-excluir.component';

const mecanicoRoutes: Route[] = [
    {
        path: '', component: MecanicoListComponent
    },
    {
        path: 'details/:id', component: MecanicoDetailComponent
    }
];

@NgModule({
    declarations: [
        MecanicoListComponent,
        MecanicoEditComponent,
        MecanicoDetailComponent,
        MecanicoModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(mecanicoRoutes),
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
        NgxMaskModule.forChild(),
        SharedModule
    ]
})
export class MecanicoModule {
}
