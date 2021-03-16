import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethod'
})
export class PaymentMethodPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case "cash":
        return "Cash";
      case "upi":
        return "UPI";
      case "other":
        return "Other";
      default:
        return "Unknown";
    }
  }

}
