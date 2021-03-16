import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tailoring'
})
export class TailoringPipe implements PipeTransform {

  transform(value: string, hindi: boolean, ...args: unknown[]): string {
    switch (value) {
      case "shirt-0":
        return "Shirt" + (hindi ? " (शर्ट)" : "");
      case "shirt-1":
        return "Open Shirt" + (hindi ? " (ओपन शर्ट)" : "");
      case "shirt-2":
        return "Bushirt" + (hindi ? " (बुशर्ट)" : "");
      case "pant-0":
        return "Pant" + (hindi ? " (पैंट)" : "");
      case "pant-1":
        return "Long Belt Pant" + (hindi ? " (लॉन्ग बेल्ट पैंट)" : "");
      case "pant-2":
        return "Wide Leg Pant" + (hindi ? " (चौड़ामोड़ पैंट)" : "");
      case "pant-3":
        return "Trouser" + (hindi ? " (ट्राउजर)" : "");
      case "pant-4":
        return "Jeans" + (hindi ? " (जींस)" : "");
      case "coat-0":
        return "Coat" + (hindi ? " (कोट)" : "");
      case "coat-1":
        return "Coat 2 Button" + (hindi ? " (कोट 2 बटन)" : "");
      case "coat-2":
        return "Waistcoat" + (hindi ? " (वेस्टकोट)" : "");
      case "coat-3":
        return "Jodhpuri Coat" + (hindi ? " (बंदगला कोट)" : "");
      case "coat-4":
        return "V Neck Coat" + (hindi ? " (वी गला कोट)" : "");
      case "jacket-0":
        return "Jacket" + (hindi ? " (जैकेट)" : "");
      case "jacket-1":
        return "Basket Jacket" + (hindi ? " (बास्केट जैकेट)" : "");
      case "jacket-2":
        return "V Neck Jacket" + (hindi ? " (वी गला जैकेट)" : "");
      case "jacket-3":
        return "Double Breasted Jacket" + (hindi ? " (डबल ब्रेस्ट जैकेट)" : "");
      case "kurta-0":
        return "Kurta/Kurti" + (hindi ? " (कुर्ता)" : "");
      case "kurta-1":
        return "Pathani Kurta" + (hindi ? " (पठानी कुर्ता)" : "");
      case "pajama-0":
        return "Pajama" + (hindi ? " (पजामा)" : "");
      case "pajama-1":
        return "Chudidaar Pajama" + (hindi ? " (चूड़ीदार पजामा)" : "");
      case "pajama-2":
        return "Pocket Pajama" + (hindi ? " (जेबदार पजामा)" : "");
      case "pajama-3":
        return "Shalwaar" + (hindi ? " (शलवार)" : "");
      case "custom":
      default:
        return "Custom";
    }
  }

}
