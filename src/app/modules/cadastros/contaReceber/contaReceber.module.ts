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
import { ContaReceberEditComponent } from './conta-receber-edit/conta-receber-edit.component';
import { ContaReceberListComponent } from './conta-receber-list/conta-receber-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { FuseCardModule } from '@fuse/components/card';
import { ContaReceberDetailComponent } from './conta-receber-detail/conta-receber-detail.component';
import { ContaReceberModalExcluirComponent } from './conta-receber-modal-excluir/conta-receber-modal-excluir.component';

const contaReceberRoutes: Route[] = [
    {
        path: '', component: ContaReceberListComponent
    },
    {
        path: 'details/:id', component: ContaReceberDetailComponent
    }
];

@NgModule({
    declarations: [
        ContaReceberListComponent,
        ContaReceberEditComponent,
        ContaReceberDetailComponent,
        ContaReceberModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(contaReceberRoutes),
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
        FuseCardModule,
        NgxMaskModule.forChild()
    ]
})
export class ContaReceberModule {
}
