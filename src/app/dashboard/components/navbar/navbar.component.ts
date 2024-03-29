import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../../../account/services/account.service';

@Component({
  selector: 'kt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isHandset: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Input("title") title: string;

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService, private _router: Router) {
    this.isHandset$.subscribe(val => (this.isHandset = val));
  }

  async logout() {
    await this.loginService.logout();
    this._router.navigate(['/login']);
  }

}
