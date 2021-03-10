import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tailoring'
})
export class TailoringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case "shirt":
        return "Shirt";
        break;
      case "pant":
        return "Pant";
        break;
      case "coat":
        return "Coat";
        break;
      case "jacket":
        return "Basket Jacket";
        break;
      case "kurta":
        return "Kurta/Kurti";
        break;
      case "shirt_pant":
        return "Shirt + Pant";
        break;
      case "custom":
      default:
        return "Custom";
    }
  }

}
