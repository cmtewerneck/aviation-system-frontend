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
import { MotoristaEditComponent } from './motorista-edit/motorista-edit.component';
import { MotoristaListComponent } from './motorista-list/motorista-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { FuseCardModule } from '@fuse/components/card';
import { MotoristaDetailComponent } from './motorista-detail/motorista-detail.component';
import { MotoristaModalExcluirComponent } from './motorista-modal-excluir/motorista-modal-excluir.component';

const motoristaRoutes: Route[] = [
    {
        path: '', component: MotoristaListComponent
    },
    {
        path: 'details/:id', component: MotoristaDetailComponent
    }
];

@NgModule({
    declarations: [
        MotoristaListComponent,
        MotoristaEditComponent,
        MotoristaDetailComponent,
        MotoristaModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(motoristaRoutes),
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
export class MotoristaModule {
}
