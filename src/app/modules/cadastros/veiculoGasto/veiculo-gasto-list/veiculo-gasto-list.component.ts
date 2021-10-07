import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FieldTypeEnum } from 'app/shared/enums/fieldType.enum';
import { FilterOperatorEnum } from 'app/shared/enums/filterOperator.enum';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { FilterInfo } from 'app/shared/models/filterInfo.model';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { MatDialog } from '@angular/material/dialog';
import { VeiculoGasto } from '../veiculoGasto.model';
import { VeiculoGastoService } from '../veiculoGasto.service';
import { VeiculoGastoModalExcelComponent } from '../veiculo-gasto-modal-excel/veiculo-gasto-modal-excel.component';
import { VeiculoGastoModalPdfComponent } from '../veiculo-gasto-modal-pdf/veiculo-gasto-modal-pdf.component';
import { VeiculoGastoModalExcluirComponent } from '../veiculo-gasto-modal-excluir/veiculo-gasto-modal-excluir.component';

@Component({
    selector: 'app-veiculo-gasto-list',
    templateUrl: './veiculo-gasto-list.component.html',
    styleUrls: ['./veiculo-gasto-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class VeiculoGastoListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    veiculosGastos: VeiculoGasto[] = [];

    pagination = {
        length: 0,
        page: 0,
        size: 25
    };

    private query = new QueryInfo();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['data', 'descricao', 'situacao', 'valor', 'placa', 'actions'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _veiculoGastoService: VeiculoGastoService,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            //data: [''],
            descricao: ['']
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "descricao",
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
        this._veiculoGastoService.list(this.query).subscribe(result => {
            this.veiculosGastos = result.data;
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
        this._veiculoGastoService.delete(id).subscribe(_ => {
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

        // if (filter.data?.trim()) {
        //     this.query.filters.push(new FilterInfo('data', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.data.trim()));
        // }

        if (filter.descricao?.trim()) {
            this.query.filters.push(new FilterInfo('descricao', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.descricao.trim()));
        }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }

    openDialogExcel(): void {
        const dialogRef = this.dialog.open(VeiculoGastoModalExcelComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }

    openDialogPdf(): void {
        const dialogRef = this.dialog.open(VeiculoGastoModalPdfComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }

    openDialogDelete(id): void {
        const dialogRef = this.dialog.open(VeiculoGastoModalExcluirComponent, {
          width: '500px',
          data: { id: id }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.load();
        });
    }
}
