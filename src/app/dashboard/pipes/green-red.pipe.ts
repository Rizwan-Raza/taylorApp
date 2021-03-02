import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greenRed'
})
export class GreenRedPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return value ? "#388e3c" : "#d32f2f";
  }

}
