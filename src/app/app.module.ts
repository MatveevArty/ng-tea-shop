import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {HeaderComponent} from "./shared/layout/header/header.component";
import {FooterComponent} from "./shared/layout/footer/footer.component";
import { LayoutComponent } from './views/layout.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbNavModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
