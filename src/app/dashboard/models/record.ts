import { Billing } from './billing';
import { Customer } from './customer';
import { Measurements } from './measurements';

export class Record {

    constructor(customer?: Customer, measurement?: Measurements, billing?: Billing, date?: number) {
        this.customer = customer;
        this.measurement = measurement;
        this.billing = billing;
        this.date = date;
        this.completed = false;
    }
    customer: Customer;
    measurement: Measurements;
    billing: Billing;
    completed: boolean;
    date: number;
}
