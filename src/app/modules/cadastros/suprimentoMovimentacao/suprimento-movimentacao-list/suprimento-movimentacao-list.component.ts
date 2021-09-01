import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { SuprimentoMovimentacaoModalExcelComponent } from '../suprimento-movimentacao-modal-excel/suprimento-movimentacao-modal-excel.component';
import { SuprimentoMovimentacaoModalPdfComponent } from '../suprimento-movimentacao-modal-pdf/suprimento-movimentacao-modal-pdf.component';
import { SuprimentoMovimentacao } from '../suprimentoMovimentacao.model';
import { SuprimentoMovimentacaoService } from '../suprimentoMovimentacao.service';

@Component({
    selector: 'app-suprimento-movimentacao-list',
    templateUrl: './suprimento-movimentacao-list.component.html',
    styleUrls: ['./suprimento-movimentacao-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SuprimentoMovimentacaoListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    movimentacoes: SuprimentoMovimentacao[] = [];

    pagination = {
        length: 0,
        page: 0,
        size: 25
    };

    private query = new QueryInfo();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['data', 'quantidade', 'tipoMovimentacao', 'nomenclatura', 'actions'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _suprimentoMovimentacaoService: SuprimentoMovimentacaoService,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            //data: [''],
            //nomenclatura: [''],
            //tipoMovimentacao: [''],
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "data",
            direction: OrderDirectionEnum.Ascending
        };
        this.query.pageNumber = 1;
        this.query.pageSize = 25;

        this.load();
    }

    ngOnDestroy(): void {
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    onPage($event: PageEvent) {
        this.query.pageNumber = $event.pageIndex + 1;
        this.query.pageSize = $event.pageSize;
        this.pagination.size = $event.pageSize;
        this.pagination.page = $event.pageIndex;
        this.load();
    }

    onSort($event: Sort) {
        this.query.order.direction = $event.direction === 'desc' ? OrderDirectionEnum.Descending : OrderDirectionEnum.Ascending;
        this.query.order.fieldName = $event.active;
        this.query.pageNumber = 1;
        this.pagination.page = 0;
        this.load();
    }

    load() {
        this.isLoading = true;
        this._suprimentoMovimentacaoService.list(this.query).subscribe(result => {
            this.movimentacoes = result.data;
            this.pagination.length = result.totalRecords;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    add() {
        this.selectedId = null;
        this.isEdit = true;
    }

    onCloseDetail($event: Boolean) {
        if ($event) {
            this.query.pageNumber = 1;
            this.pagination.page = 0;
            this.pagination.length = 0;
            this.load();
        }
        this.isEdit = false;
    }

    edit(id: string) {
        this.selectedId = id;
        this.isEdit = true;
    }

    delete(id: string) {
        this.isLoading = true;
        this._suprimentoMovimentacaoService.delete(id).subscribe(_ => {
            console.log("Exclusão com sucesso");
            this.load();
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    onFilterExpanded() {
        this.filtersExpanded = !this.filtersExpanded;
    }

    filter() {
        this.query.filters = [];
        const filter = this.filterForm.value;

        // if (filter.cupom?.trim()) {
        //     this.query.filters.push(new FilterInfo('cupom', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.cupom.trim()));
        // }

        // if (filter.local?.trim()) {
        //     this.query.filters.push(new FilterInfo('local', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.local.trim()));
        // }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }

    openDialogPdf(): void {
        const dialogRef = this.dialog.open(SuprimentoMovimentacaoModalPdfComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }

    openDialogExcel(): void {
        const dialogRef = this.dialog.open(SuprimentoMovimentacaoModalExcelComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }
}
