export class Billing {
    public constructor(init?: Partial<Billing>) {
        Object.assign(this, init);
    }

    cost: number;
    method: string;
    status: string;
    installment: number;
}
