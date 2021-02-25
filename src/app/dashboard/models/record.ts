import { Billing } from './billing';
import { Customer } from './customer';
import { Measurements } from './measurements';

export class Record {

    constructor(customer?: Customer, measurement?: Measurements, billing?: Billing, date?: number, uid?: string) {
        this.customer = customer;
        this.measurement = measurement;
        this.billing = billing;
        this.date = date;
        this.uid = uid;
        this.completed = false;
    }
    customer: Customer;
    measurement: Measurements;
    billing: Billing;
    completed: boolean;
    uid: string;
    date: number;
}
