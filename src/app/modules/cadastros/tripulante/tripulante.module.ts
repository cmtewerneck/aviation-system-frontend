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
import { TripulanteEditComponent } from './tripulante-edit/tripulante-edit.component';
import { TripulanteListComponent } from './tripulante-list/tripulante-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { FuseCardModule } from '@fuse/components/card';
import { TripulanteDetailComponent } from './tripulante-detail/tripulante-detail.component';
import { TripulanteModalExcluirComponent } from './tripulante-modal-excluir/tripulante-modal-excluir.component';

const tripulanteRoutes: Route[] = [
    {
        path: '', component: TripulanteListComponent
    },
    {
        path: 'details/:id', component: TripulanteDetailComponent
    }
];

@NgModule({
    declarations: [
        TripulanteListComponent,
        TripulanteEditComponent,
        TripulanteDetailComponent,
        TripulanteModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(tripulanteRoutes),
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
export class TripulanteModule {
}
