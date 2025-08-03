import { Component } from '@angular/core';
import {ProductService} from "./services/product.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProductService]
})
export class AppComponent {
  title = 'tea-shop';
}
