import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paidStatus'
})
export class PaidStatusPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value == "pod" ? "No" : "Yes";
  }

}
