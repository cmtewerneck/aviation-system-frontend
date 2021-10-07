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
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { FuseCardModule } from '@fuse/components/card';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';
import { AlunoModalExcluirComponent } from './aluno-modal-excluir/aluno-modal-excluir.component';

const alunoRoutes: Route[] = [
    {
        path: '', component: AlunoListComponent
    },
    {
        path: 'details/:id', component: AlunoDetailComponent
    }
];

@NgModule({
    declarations: [
        AlunoListComponent,
        AlunoEditComponent,
        AlunoDetailComponent,
        AlunoModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(alunoRoutes),
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
        NgxMaskModule.forChild(),
        FuseCardModule,
        SharedModule
    ]
})
export class AlunoModule {
}
