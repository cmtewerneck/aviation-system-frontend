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
import { ServicoEditComponent } from './servico-edit/servico-edit.component';
import { ServicoListComponent } from './servico-list/servico-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { FuseCardModule } from '@fuse/components/card';
import { ServicoDetailComponent } from './servico-detail/servico-detail.component';
import { ServicoModalExcluirComponent } from './servico-modal-excluir/servico-modal-excluir.component';

const servicoRoutes: Route[] = [
    {
        path: '', component: ServicoListComponent
    },
    {
        path: 'details/:id', component: ServicoDetailComponent
    }
];

@NgModule({
    declarations: [
        ServicoListComponent,
        ServicoEditComponent,
        ServicoDetailComponent,
        ServicoModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(servicoRoutes),
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
export class ServicoModule {
}
