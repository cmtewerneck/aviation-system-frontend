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
import { InstrutorEditComponent } from './instrutor-edit/instrutor-edit.component';
import { InstrutorListComponent } from './instrutor-list/instrutor-list.component';
import { FuseCardModule } from '@fuse/components/card';
import { InstrutorDetailComponent } from './instrutor-detail/instrutor-detail.component';
import { InstrutorModalExcluirComponent } from './instrutor-modal-excluir/instrutor-modal-excluir.component';

const instrutorRoutes: Route[] = [
    {
        path: '', component: InstrutorListComponent
    },
    {
        path: 'details/:id', component: InstrutorDetailComponent
    }
];

@NgModule({
    declarations: [
        InstrutorListComponent,
        InstrutorEditComponent,
        InstrutorDetailComponent,
        InstrutorModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(instrutorRoutes),
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
export class InstrutorModule {
}
