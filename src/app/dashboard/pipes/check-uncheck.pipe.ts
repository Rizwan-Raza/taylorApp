import { Pipe, PipeTransform } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Pipe({
  name: 'checkUncheck'
})
export class CheckUncheckPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return value ? "check" : "close";
  }

}
