import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FieldTypeEnum } from 'app/shared/enums/fieldType.enum';
import { FilterOperatorEnum } from 'app/shared/enums/filterOperator.enum';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { FilterInfo } from 'app/shared/models/filterInfo.model';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { Subject } from 'rxjs';
import { AgendamentoModalExcelComponent } from '../agendamento-modal-excel/agendamento-modal-excel.component';
import { AgendamentoModalExcluirComponent } from '../agendamento-modal-excluir/agendamento-modal-excluir.component';
import { AgendamentoModalPdfComponent } from '../agendamento-modal-pdf/agendamento-modal-pdf.component';
import { Agendamento } from '../agendamento.model';
import { AgendamentoService } from '../agendamento.service';

@Component({
    selector: 'app-agendamento-list',
    templateUrl: './agendamento-list.component.html',
    styleUrls: ['./agendamento-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AgendamentoListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    agendamentos: Agendamento[] = [];

    pagination = {
        length: 0,
        page: 0,
        size: 25
    };

    private query = new QueryInfo();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['title', 'start', 'matricula', 'descricao', 'actions'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _agendamentoService: AgendamentoService,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            //start: [''],
            //end: [''],
            title: [''],
            matriculaAeronave: [''],
            descricaoCategoria: ['']
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "start",
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
        this._agendamentoService.list(this.query).subscribe(result => {
            this.agendamentos = result.data;
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
        this._agendamentoService.delete(id).subscribe(_ => {
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

        if (filter.title?.trim()) {
            this.query.filters.push(new FilterInfo('title', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.title.trim()));
        }

        if (filter.matriculaAeronave?.trim()) {
            this.query.filters.push(new FilterInfo('matriculaAeronave', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.matriculaAeronave.trim()));
        }

        if (filter.descricaoCategoria?.trim()) {
            this.query.filters.push(new FilterInfo('descricaoCategoria', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.descricaoCategoria.trim()));
        }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }

    openDialogExcel(): void {
        const dialogRef = this.dialog.open(AgendamentoModalExcelComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }

    openDialogPdf(): void {
        const dialogRef = this.dialog.open(AgendamentoModalPdfComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }

    openDialogDelete(id): void {
        const dialogRef = this.dialog.open(AgendamentoModalExcluirComponent, {
          width: '500px',
          data: { id: id }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.load();
        });
    }
}
