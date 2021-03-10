export class Measurements {
    public constructor(init?: Partial<Measurements>) {
        Object.assign(this, init);
    }

    neck: number;
    chest: number;
    waist: number;
    shirtSeat: number;
    shirtLength: number;
    shoulderWidth: number;
    armLength: number;
    wrist: number;

    pantsHip: number;
    pantsSeat: number;
    inseam: number;
    hip: number;

    back: number;
    outerLength: number;
    crotch: number;
    thigh: number;
    pantsCuff: number;

    other: string;
}