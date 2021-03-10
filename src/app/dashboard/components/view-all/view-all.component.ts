import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Record } from '../../models/record';
import { MeasurementsService } from '../../services/measurements.service';

@Component({
  selector: 'view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements AfterViewInit, OnInit {

  title: string = "View All Records";

  constructor(private _measurementService: MeasurementsService, private route: ActivatedRoute, private dialog: MatDialog, private snackbar: MatSnackBar) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Record>;
  @ViewChild('filterInput') fInput: ElementRef;
  dataSource: MatTableDataSource<Record>;

  showLoader: boolean = true;
  dataRecords: Map<string, Record> = new Map<string, Record>();
  filterString: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'sno',
    'customer.firstName',
    'customer.phoneNumer',
    'customer.tailoring',
    'billing.cost',
    'billing.status',
    'completed',
    'date',
    'actions'
  ];

  ngOnInit() {
    this.filterString = this.route.snapshot.params.filter;

    this.dataSource = new MatTableDataSource<Record>(Array.from(this.dataRecords.values()));

    this._measurementService.getAll().subscribe(data => {
      this.dataRecords.clear();
      data.forEach(x => {
        this.dataRecords.set(x.payload.doc.id, x.payload.doc.data() as Record);
      });
      this.showLoader = false;
      this.dataSource.data = Array.from(this.dataRecords.values());
    });


    // Sorting
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'customer.firstName': return item.customer.firstName;
        case 'billing.cost': return item.billing.cost;
        default: return item[property];
      }
    };

    // Filtering 
    this.dataSource.filterPredicate = (data: Record, filter: string) => {
      let predicateString: string;
      let predicateBools: boolean[] = [];
      Object.keys(data.customer).map(k => predicateString += data.customer[k]);
      if (filter.includes(":paid")) {
        predicateBools.push(data.billing.status == 'paid');
      }
      if (filter.includes("::unpaid")) {
        predicateBools.push(data.billing.status != 'paid');
      }
      if (filter.includes("::completed")) {
        predicateBools.push(data.completed);
      }
      if (filter.includes("::incomplete")) {
        predicateBools.push(data.completed);
      }
      if (filter.includes("::shirt")) {
        predicateBools.push(data.customer.tailoring == "shirt");
      }
      if (filter.includes("::pant")) {
        predicateBools.push(data.customer.tailoring == "pant");
      }
      if (filter.includes("::coat")) {
        predicateBools.push(data.customer.tailoring == "coat");
      }
      if (filter.includes("::jacket")) {
        predicateBools.push(data.customer.tailoring == "jacket");
      }
      if (filter.includes("::kurta")) {
        predicateBools.push(data.customer.tailoring == "kurta");
      }
      if (filter.includes("::shirt_pant")) {
        predicateBools.push(data.customer.tailoring == "shirt_pant");
      }
      if (filter.includes("::custom")) {
        predicateBools.push(data.customer.tailoring == "custom");
      }
      predicateBools.push(predicateString.trim().toLowerCase().indexOf(filter.split("::")[0]) != -1);
      console.log(predicateBools);
      return predicateBools.every(x => x);
    };

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    if (this.filterString?.length > 0) {
      this.applyFilter(this.filterString);
    }
  }

  getValue(obj, filter) {
    return filter.split('.').reduce((o, i) => o[i], obj);
  }

  deleteItem(id: string) {
    if (confirm("Are you sure You want to Delete this?")) {
      this._measurementService.delete(id).then(() => {
        alert("Record Deleted");
      }).catch(err => {
        alert("Something went wrong. Try again.");
      });
    }
  }

  updateField(id: string, path: string, value: any, success: string) {
    this._measurementService.updateField(id, path, value).then(_ => this.snackbar.open(success, 'CLOSE', { duration: 5000 })).catch(e => this.snackbar.open(e.message, 'CLOSE', { duration: 5000 }));
  }

  openRecord(id: string) {
    // For Release Mode
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;

    // Create a browser window
    const win = new BrowserWindow({
      width: 900,
      height: 900,
      center: true,
    });
    win.removeMenu();
    // Load the page + route
    win.loadURL('file://' + __dirname + '/index.html#/record/' + id);

    // For Debug Mode
    // window.open('/index.html#/record/' + id, '_blank', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    //   // this.dialog.open(RecordComponent,
    //   //   {
    //   //     minWidth: 800,
    //   //     maxHeight: 600,
    //   //     data: { id: id }
    //   //   });
  }



}
