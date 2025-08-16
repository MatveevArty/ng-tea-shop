import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, Subscription, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  /**
   * Статус загрузки данных с сервера
   */
  public loading: boolean = false;

  /**
   * Продукты
   */
  public products: ProductType[] = [];

  /**
   * Подписка на query-параметры страницы
   * @private
   */
  private queryParamsSubscription: Subscription | null = null;

  /**
   * Подписка на данные товаров
   * @private
   */
  private productsSubscription: Subscription | null = null;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.queryParamsSubscription = this.route.queryParams.pipe(
      switchMap(queryParams => {
        const searchQuery = queryParams['search'] || '';
        this.loading = true;
        return this.productService.getProducts(searchQuery).pipe(
          finalize(() => this.loading = false),
        );
      })
    )
      .subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (error) => {
          console.log('Ошибка при получении товаров', error);
          this.router.navigate(['/']);
        },
      })
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
