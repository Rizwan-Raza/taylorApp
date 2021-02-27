import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Record } from '../../models/record';
import { MeasurementsService } from '../../services/measurements.service';
import { RecordComponent } from '../record/record.component';

@Component({
  selector: 'view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements AfterViewInit, OnInit {

  title: string = "View All Records";

  constructor(private _measurementService: MeasurementsService, private route: ActivatedRoute, private dialog: MatDialog) { }


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
    // console.log(filter);

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
        case 'billing.status': return item.billing.status;
        default: return item[property];
      }
    };

    // Filtering 
    this.dataSource.filterPredicate = (data: Record, filter: string) => {
      // console.log(filter);
      let predicateString: string;
      Object.keys(data.customer).map(k => predicateString += data.customer[k]);
      // console.log(predicateString);
      switch (filter) {
        case ":paid":
          return data.billing.status == 'paid';
        case ":unpaid":
          return data.billing.status != 'paid';
        case ":incomplete":
          return !data.completed;
        case ":completed":
          return data.completed;
        case ":unpaid:incomplete":
          return data.billing.status != 'paid' && !data.completed;
        case ":unpaid:completed":
          return data.billing.status != 'paid' && data.completed;
        case ":paid:incomplete":
          return data.billing.status == 'paid' && !data.completed;;
        case ":paid:completed":
          return data.billing.status == 'paid' && data.completed;;
        default:
          return predicateString.trim().toLowerCase().indexOf(filter) != -1;
      }
    };

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    // console.log(this.dataSource.data.length);
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

  markAsPaid(id: string) {
    this._measurementService.markRecordAsPaid(id).then(_ => { console.log("Marked Paid"); })
      .catch(err => {
        console.log(err);
      });
  }

  markAsCompleted(id: string) {
    this._measurementService.markRecordAsCompleted(id).then(_ => { console.log("Marked Completed"); })
      .catch(err => {
        console.log(err);
      });
  }

  openRecord(id: string) {
    this.dialog.open(RecordComponent,
      {
        minWidth: 800,
        maxHeight: 600,
        data: { id: id }
      });
  }

}
