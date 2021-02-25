import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  records: Record[] = [];
  constructor(private _angularStore: AngularFirestore) { }

  addNew(record: Record) {
    return this._angularStore.collection("records").doc(record.date.toString()).set({
      customer: { ...record.customer },
      measurement: { ...record.measurement },
      billing: { ...record.billing },
      date: record.date,
      completed: record.completed
    });
  }

  getAll() {
    return this._angularStore.collection<Record>("records", ref => ref.orderBy("date")).snapshotChanges();
  }
}


// data.forEach((doc) => {
//   this.records.push(
//     new Record(
//       new Customer((doc.payload.doc.data() as Record).customer),
//       new Women((doc.payload.doc.data() as Record).measurement),
//       new Billing((doc.payload.doc.data() as Record).billing),
//       (doc.payload.doc.data() as Record).date)
//   );
// });
