import { Component } from '@angular/core';
import { ROUTES_NAME } from 'src/app/constants/routing.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-angular';
  routesName = ROUTES_NAME;
}
