import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../components/types/product.type";
import {FormOrderDataType} from "../components/types/form-order-data.type";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  /**
   * GET запрос на получение всех продуктов или по названию
   * @param searchValue поисковый запрос
   */
  public getProducts(searchValue?: string): Observable<ProductType[]> {
    if (searchValue) {
      return this.http.get<ProductType[]>('https://testologia.ru/tea', {
        params: {
          search: searchValue ,
        }
      });
    } else {
      return this.http.get<ProductType[]>('https://testologia.ru/tea');
    }
  }

  /**
   * GET запрос на получение конкретного продукта по его id
   * @param id id продукта
   */
  public getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>('https://testologia.ru/tea?id=' + id);
  }

  /**
   * POST запрос на создание заказа с отправкой данных
   * @param data данные заказа из формы
   */
  public createOrder(data: FormOrderDataType) {
    return this.http.post<{ success: boolean, message?: string }>('https://testologia.ru/order-tea', data)
  }
}
