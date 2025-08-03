import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  /**
   * Статус загрузки данных с сервера
   */
  public loading: boolean = false;

  /**
   * Продукты
   */
  public products: ProductType[] =[];

  constructor(private productService: ProductService,
              private router: Router) {}

  ngOnInit(): void {
    this.loading = true;

    this.productService.getProducts().pipe(
      tap(() => {
        this.loading = false;
      })
    ).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.log('Ошибка при получении товаров', error);
          this.router.navigate(['/']);
        }
      });
  }
}
