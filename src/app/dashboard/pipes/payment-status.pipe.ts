import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case "pod":
        return "Unpaid, Pay on Delivery";
      case "paid":
        return "Paid";
      case "install":
        return "Partially Paid, Installment";
      default:
        return "Unknown";
    }
  }

}
