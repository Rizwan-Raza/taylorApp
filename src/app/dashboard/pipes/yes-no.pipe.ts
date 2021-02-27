import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    console.log("Yes No Pipe", value);
    return value ? "Yes" : "No";;
  }

}
