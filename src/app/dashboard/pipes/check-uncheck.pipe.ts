import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkUncheck'
})
export class CheckUncheckPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return value ? "check" : "close";
  }

}
