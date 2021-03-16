import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'kt-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public info: {title: string, image: string, desc: string }) { }

}
