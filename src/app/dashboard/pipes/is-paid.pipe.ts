import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPaid'
})
export class IsPaidPipe implements PipeTransform {

  transform(value: string, ...args: string[]): boolean {
    return value == "paid";
  }

}
