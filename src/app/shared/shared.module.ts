import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { TextLengthPipe } from "./pipes/text-length.pipe";
import {RouterModule} from "@angular/router";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    ProductCardComponent,
    TextLengthPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
  ],
  exports: [
    ProductCardComponent,
    TextLengthPipe,
  ]
})
export class SharedModule { }
