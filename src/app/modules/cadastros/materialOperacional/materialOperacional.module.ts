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
import { MaterialOperacionalEditComponent } from './material-operacional-edit/material-operacional-edit.component';
import { MaterialOperacionalListComponent } from './material-operacional-list/material-operacional-list.component';
import { MaterialOperacionalModalPdfComponent } from './material-operacional-modal-pdf/material-operacional-modal-pdf.component';
import { MaterialOperacionalModalExcelComponent } from './material-operacional-modal-excel/material-operacional-modal-Excel.component';
import { MaterialOperacionalModalExcluirComponent } from './material-operacional-modal-excluir/material-operacional-modal-excluir.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialOperacionalDetailComponent } from './material-operacional-detail/material-operacional-detail.component';
import { FuseCardModule } from '@fuse/components/card';

const materialOperacionalRoutes: Route[] = [
    {
        path: '', component: MaterialOperacionalListComponent
    },
    {
        path: 'details/:id', component: MaterialOperacionalDetailComponent
    }
];

@NgModule({
    declarations: [
        MaterialOperacionalListComponent,
        MaterialOperacionalEditComponent,
        MaterialOperacionalDetailComponent,
        MaterialOperacionalModalPdfComponent,
        MaterialOperacionalModalExcelComponent,
        MaterialOperacionalModalExcluirComponent
    ],
    imports: [
        RouterModule.forChild(materialOperacionalRoutes),
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
        ImageCropperModule,
        SharedModule,
        FuseCardModule
    ]
})
export class MaterialOperacionalModule {
}
