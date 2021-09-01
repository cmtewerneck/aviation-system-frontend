import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FieldTypeEnum } from 'app/shared/enums/fieldType.enum';
import { FilterOperatorEnum } from 'app/shared/enums/filterOperator.enum';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { FilterInfo } from 'app/shared/models/filterInfo.model';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { Tripulante } from '../tripulante.model';
import { TripulanteService } from '../tripulante.service';

@Component({
    selector: 'app-tripulante-list',
    templateUrl: './tripulante-list.component.html',
    styleUrls: ['./tripulante-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TripulanteListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    tripulantes: Tripulante[] = [];

    pagination = {
        length: 0,
        page: 0,
        size: 25
    };

    private query = new QueryInfo();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['nome', 'canac', 'documento', 'dataAdmissao', 'validadeCMA','actions'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _tripulanteService: TripulanteService,
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            nome: [''],
            canac: ['']
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "nome",
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
        this._tripulanteService.list(this.query).subscribe(result => {
            this.tripulantes = result.data;
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
        this._tripulanteService.delete(id).subscribe(_ => {
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

        if (filter.nome?.trim()) {
            this.query.filters.push(new FilterInfo('nome', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.nome.trim()));
        }

        if (filter.canac?.trim()) {
            this.query.filters.push(new FilterInfo('canac', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.canac.trim()));
        }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }

    exportToExcel() {
        this._tripulanteService.exportToExcel(2).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }

    exportToPdf() {
        this._tripulanteService.exportToPdf(2).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}
