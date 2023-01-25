import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SetColumnSeqService } from 'src/app/admin/dialogs/set-column-seq/set-column-seq.service';

const ELEMENT_DATA: any[] = [
  { zone: 1, locationName: 'Hydrogen', totalLines: 1.0079, open: 'H',completed:'1' },

];
@Component({
  selector: 'app-tran-carousel-lzone',
  templateUrl: './tran-carousel-lzone.component.html',
  styleUrls: ['./tran-carousel-lzone.component.scss'],
})
export class TranCarouselLzoneComponent implements OnInit, AfterViewInit {
  public columnValues: any = [];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  displayedColumns: string[] = [
    'Zone',
    'Location Name',
    'Total Lines',
    'Open',
    'Completed',
  ];
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;
  customPagination: any = {
    total: '',
    recordsPerPage: 20,
    startIndex: '',
    endIndex: '',
  };
  columnSearch: any = {
    searchColumn: {
      colHeader: '',
      colDef: '',
    },
    searchValue: '',
  };

  sortColumn: any = {
    columnName: 32,
    sortOrder: 'asc',
  };
  constructor(private router: Router, private seqColumn: SetColumnSeqService) {
    if (this.router.getCurrentNavigation()?.extras?.state?.['searchValue']) {
      this.columnSearch.searchValue =
        this.router.getCurrentNavigation()?.extras?.state?.['searchValue'];
      this.columnSearch.searchColumn = {
        colDef: this.router.getCurrentNavigation()?.extras?.state?.['colDef'],
        colHeader:
          this.router.getCurrentNavigation()?.extras?.state?.['colHeader'],
      };
    }
  }

  ngOnInit(): void {
    this.customPagination = {
      total: '',
      recordsPerPage: 20,
      startIndex: 0,
      endIndex: 20,
    };

    // this.initializeApi();
    //  this.getContentData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}
