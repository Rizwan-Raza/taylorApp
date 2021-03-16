
export class Customer {
    public constructor(init?: Partial<Customer>) {
        Object.assign(this, init);
    }
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    address: string;
    tailoring: string;
    custom: string;
}
