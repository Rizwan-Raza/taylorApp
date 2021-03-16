import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';



@NgModule({
  declarations: [WebviewDirective, PageNotFoundComponent],
  imports: [CommonModule, TranslateModule, FormsModule, MatButtonModule],
  exports: [TranslateModule, WebviewDirective, FormsModule]
})
export class SharedModule {}
