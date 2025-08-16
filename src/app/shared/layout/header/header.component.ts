import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Свёрнуто ли меню в адаптиве
   */
  isMenuCollapsed = true;


  constructor(private readonly productService: ProductService,
              private readonly router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Найти продукты по названию
   * @param searchValue название продукта
   */
  public findProducts(searchValue: string): void {
    this.productService.getProducts(searchValue).subscribe(() => {
      if (searchValue) {
        this.router.navigate(['/products'], { queryParams: { search: searchValue}});
      } else {
        this.router.navigate(['/products']);
      }
    })
  }

}
