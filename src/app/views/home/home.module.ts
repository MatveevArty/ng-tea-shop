import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from "./main/main.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
