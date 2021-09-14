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
import { FerramentaEditComponent } from './ferramenta-edit/ferramenta-edit.component';
import { FerramentaListComponent } from './ferramenta-list/ferramenta-list.component';
import { FerramentaModalExcelComponent } from './ferramenta-modal-excel/ferramenta-modal-excel.component';
import { FerramentaModalPdfComponent } from './ferramenta-modal-pdf/ferramenta-modal-pdf.component';
import { FuseCardModule } from '@fuse/components/card';
import { FerramentaModalExcluirComponent } from './ferramenta-modal-excluir/ferramenta-modal-excluir.component';
import { FerramentaDetailComponent } from './ferramenta-detail/ferramenta-detail.component';
import { ImageCropperModule } from 'ngx-image-cropper';

const ferramentaRoutes: Route[] = [
    {
        path: '', component: FerramentaListComponent
    },
    {
        path: 'details/:id', component: FerramentaDetailComponent
    }
];

@NgModule({
    declarations: [
        FerramentaListComponent,
        FerramentaEditComponent,
        FerramentaModalPdfComponent,
        FerramentaModalExcelComponent,
        FerramentaModalExcluirComponent,
        FerramentaDetailComponent,
    ],
    imports: [
        RouterModule.forChild(ferramentaRoutes),
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
        ImageCropperModule,
        SharedModule
    ]
})
export class FerramentaModule {
}
