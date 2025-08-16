import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../types/product.type";
import {BackendResponseType} from "../../types/backend-response.type";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  /**
   * Ответ с бекенда по созданию заказа
   */
  public backendResponse: BackendResponseType | null = null;

  /**
   * Текущий продукт в заказе
   */
  public currentProduct: ProductType | null = null;

  /**
   * Форма с данными заказа и их валидацией
   */
  public orderForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    product: [{value: '', disabled: true}, Validators.required],
    address: ['', [Validators.required, Validators.minLength(10)]],
    comment: ['']
  });

  /**
   * Геттер для поля Имя
   */
  get name() {
    return this.orderForm.get('name');
  }

  /**
   * Геттер для поля Фамилия
   */
  get lastName() {
    return this.orderForm.get('last_name');
  }

  /**
   * Геттер для поля Номер телефона
   */
  get phone() {
    return this.orderForm.get('phone');
  }

  /**
   * Геттер для поля Страна
   */
  get country() {
    return this.orderForm.get('country');
  }

  /**
   * Геттер для поля Индекс
   */
  get zip() {
    return this.orderForm.get('zip');
  }

  /**
   * Геттер для поля Адрес
   */
  get address() {
    return this.orderForm.get('address');
  }

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.productService.getProduct(Number(params['product'])).subscribe({
          next: (data) => {
            this.currentProduct = data;
            this.orderForm.get('product')?.setValue(this.currentProduct.title);
            this.orderForm.get('product')?.disable();
          },
          error: (error) => {
            console.log('Ошибка при получении данного товара', error);
            this.router.navigate(['/']);
          }
        });
      }
    })
  }

  /**
   * Отправки запроса на создание заказа с данными формы
   */
  sendOrderData() {
    if (this.orderForm.invalid) return;

    const formData = this.orderForm.getRawValue();

    this.productService.createOrder(formData).subscribe({
      next: (data) => {
        console.log(data);
        this.backendResponse = data;
      },
      error: (error) => {
        console.log('Ошибка при создании заказа', error);
        this.router.navigate(['/']);
      }
    })
  }

}
