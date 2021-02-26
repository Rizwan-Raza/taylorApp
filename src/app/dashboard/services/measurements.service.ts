import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Billing } from '../models/billing';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  records: Record[] = [];
  constructor(private _angularStore: AngularFirestore) { }

  addNew(record: Record) {
    return this._angularStore.collection("records").doc(record.uid + record.date).set({
      customer: { ...record.customer },
      measurement: { ...record.measurement },
      billing: { ...record.billing },
      date: record.date,
      completed: record.completed,
      uid: record.uid
    });
  }

  getAll() {
    return this._angularStore.collection<Record>("records", ref => ref.orderBy("date")).snapshotChanges();
  }

  getById(id: string) {
    return this._angularStore.collection<Record>("records").doc(id).get();
  }

  delete(id:string) {
    return this._angularStore.collection<Record>("records").doc(id).delete();
  }

  markRecordAsPaid(id: string){
    return this._angularStore.collection<Record>("records").doc(id).update({billing: {status: 'paid'} as Billing});
  }

  markRecordAsCompleted(id: string){
    return this._angularStore.collection<Record>("records").doc(id).update({completed: true});
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
