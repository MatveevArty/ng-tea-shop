import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/accordion';
import { Observable, Subscription } from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare global {
  interface JQuery {
    accordion(options?: any): JQuery;
  }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('accordion') accordion!: ElementRef;
  @ViewChild('modalContent', { static: true }) modalContent!: ElementRef;

  /**
   * Подписка на поток попапа
   */
  private subscription: Subscription | null = null;

  constructor(private modalService: NgbModal) {}

  /**
   * Создание подписки и подписывание
   */
  ngOnInit() {
    this.subscription = new Observable<void>(observer => {
      setTimeout(() => {
        observer.next();
      }, 5000)
    }).subscribe(() => {
      this.openModal();
    });
  }

  /**
   * Инициализация аккордиона
   */
  ngAfterViewInit(): void {
    $(this.accordion.nativeElement).accordion({
      heightStyle: "content",
    });
  }

  /**
   * Отображение попапа
   */
  openModal(): void {
    this.modalService.open(this.modalContent, {
      backdrop: 'static',
      keyboard: false
    });
  }

  /**
   * Отписка от потока попапа
   */
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
