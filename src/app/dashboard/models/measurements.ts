export class Measurements {
    public constructor(init?: Partial<Measurements>) {
        Object.assign(this, init);
    }

    neck: string;
    chest: string;
    waist: string;
    shirtSeat: string;
    shirtLength: string;
    shoulderWidth: string;
    armLength: string;
    wrist: string;

    pantsHip: string;
    pantsSeat: string;
    inseam: string;
    hip: string;

    back: string;
    outerLength: string;
    crotch: string;
    thigh: string;
    pantsCuff: string;

    other: string;
}