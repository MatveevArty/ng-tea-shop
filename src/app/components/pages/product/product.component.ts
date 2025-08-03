import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: ProductType;

  /**
   * Статус загрузки данных с сервера
   */
  public loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {

        this.loading = true;

        this.productService.getProduct(Number(params['id'])).pipe(
          tap(() => {
            this.loading = false;
          })).subscribe({
          next: (data) => {
            this.product = data;
          },
          error: (error) => {
            console.log('Ошибка при получении данного товара', error);
            this.router.navigate(['/']);
          }
        });

      }
    })
  }

}
