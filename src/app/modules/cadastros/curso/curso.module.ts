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
import { CursoEditComponent } from './curso-edit/curso-edit.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { FuseCardModule } from '@fuse/components/card';
import { CursoDetailComponent } from './curso-detail/curso-detail.component';
import { CursoModalExcluirComponent } from './curso-modal-excluir/curso-modal-excluir.component';

const cursoRoutes: Route[] = [
    {
        path: '', component: CursoListComponent
    },
    {
        path: 'details/:id', component: CursoDetailComponent
    }
];

@NgModule({
    declarations: [
        CursoListComponent,
        CursoEditComponent,
        CursoDetailComponent,
        CursoModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(cursoRoutes),
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
export class CursoModule {
}
