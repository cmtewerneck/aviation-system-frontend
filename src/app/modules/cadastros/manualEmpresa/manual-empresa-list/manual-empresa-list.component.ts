import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FieldTypeEnum } from 'app/shared/enums/fieldType.enum';
import { FilterOperatorEnum } from 'app/shared/enums/filterOperator.enum';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { FilterInfo } from 'app/shared/models/filterInfo.model';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { ManualEmpresa } from '../manualEmpresa.model';
import { ManualEmpresaService } from '../manualEmpresa.service';

@Component({
    selector: 'app-manual-empresa-list',
    templateUrl: './manual-empresa-list.component.html',
    styleUrls: ['./manual-empresa-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ManualEmpresaListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    manuais: ManualEmpresa[] = [];

    pagination = {
        length: 0,
        page: 0,
        size: 25
    };

    private query = new QueryInfo();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['sigla', 'revisaoAtual', 'dataRevisao', 'revisaoAnalise', 'actions'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _manualEmpresaService: ManualEmpresaService,
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            sigla: ['']
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "sigla",
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
        this._manualEmpresaService.list(this.query).subscribe(result => {
            this.manuais = result.data;
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
        this._manualEmpresaService.delete(id).subscribe(_ => {
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

        if (filter.sigla?.trim()) {
            this.query.filters.push(new FilterInfo('sigla', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.sigla.trim()));
        }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }

    exportToExcel() {
        this._manualEmpresaService.exportToExcel().subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }

    exportToPdf() {
        this._manualEmpresaService.exportToPdf().subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}
