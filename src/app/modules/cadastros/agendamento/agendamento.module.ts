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
import { AgendamentoEditComponent } from './agendamento-edit/agendamento-edit.component';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { AgendamentoModalPdfComponent } from './agendamento-modal-pdf/agendamento-modal-pdf.component';
import { AgendamentoModalExcelComponent } from './agendamento-modal-excel/agendamento-modal-excel.component';
import { AgendamentoModalExcluirComponent } from './agendamento-modal-excluir/agendamento-modal-excluir.component';
import { AgendamentoDetailComponent } from './agendamento-detail/agendamento-detail.component';
import { FuseCardModule } from '@fuse/components/card';

const agendamentoRoutes: Route[] = [
    {
        path: '', component: AgendamentoListComponent
    },
    {
        path: 'details/:id', component: AgendamentoDetailComponent
    }
];

@NgModule({
    declarations: [
        AgendamentoListComponent,
        AgendamentoEditComponent,
        AgendamentoModalExcelComponent,
        AgendamentoModalExcluirComponent,
        AgendamentoDetailComponent,
        AgendamentoModalPdfComponent
    ],
    imports: [
        RouterModule.forChild(agendamentoRoutes),
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
export class AgendamentoModule {
}
